const url = 'https://www.googleapis.com/drive/v3'; // demo method to understand easier https://developers.google.com/drive/v3/reference/files/list
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3';

const boundaryString = 'adiwon'; // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload
const contentTypeJson = 'application/json; charset=UTF-8';
/**
 * query params
 */
function queryParams(fileName) {
  return encodeURIComponent(`name = '${fileName}'`);
}

function createHeaders(
  apiToken,
  contentType,
  contentLength,
  ...additionalPairs
) {
  let pairs = [['Authorization', `Bearer ${apiToken}`]];

  [
    ['Content-Type', contentType],
    ['Content-Length', contentLength],
  ].forEach((data) => (data[1] ? pairs.push(data) : undefined));

  if (additionalPairs) {
    pairs = pairs.concat(additionalPairs);
  }

  // eslint-disable-next-line no-undef
  const headers = new Headers();

  for (let pair of pairs) {
    headers.append(pair[0], pair[1]);
  }

  return headers;
}

function deleteFile(apiToken, fileId) {
  return fetch(`${url}/files/${fileId}`, {
    method: 'DELETE',
    headers: createHeaders(apiToken),
  });
}

/**
 * crete multi body
 */
function createMultipartBody(body, fileName, storageFolder, isUpdate = false) {
  // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
  const metaData = {
    name: fileName,
    description: 'Backup data for my app',
    mimeType: 'application/json',
  };
  // if it already exists, specifying parents again throws an error
  if (!isUpdate) {
    metaData.parents = [storageFolder];
  }

  // request body
  const multipartBody =
    `\r\n--${boundaryString}\r\nContent-Type: ${contentTypeJson}\r\n\r\n` +
    `${JSON.stringify(metaData)}\r\n` +
    `--${boundaryString}\r\nContent-Type: application/json\r\n\r\n` +
    `${JSON.stringify(body)}\r\n` +
    `--${boundaryString}--`;

  return multipartBody;
}

/**
 * configure post method
 */
function configurePostOptions(apiToken, bodyLength, isUpdate = false) {
  // eslint-disable-next-line no-undef
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${apiToken}`);
  headers.append(
    'Content-Type',
    `multipart/related; boundary=${boundaryString}`,
  );
  headers.append('Content-Length', bodyLength);
  return {
    method: isUpdate ? 'PATCH' : 'POST',
    headers,
  };
}

/**
 * configure get method
 */
function configureGetOptions(apiToken) {
  // eslint-disable-next-line no-undef
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${apiToken}`);
  return {
    method: 'GET',
    headers,
  };
}

/**
 * create download url based on id
 */
function downloadFile(apiToken, existingFileId) {
  const options = configureGetOptions(apiToken);
  console.log(existingFileId);
  if (!existingFileId) {
    throw new Error("Didn't provide a valid file id.");
  }
  return `${url}/files/${existingFileId}?alt=media`;
}

/**
 * returns the files meta data only. the id can then be used to download the file
 */
function getFile(apiToken, fileName, storageFolder) {
  const qParams = queryParams(fileName);
  const options = configureGetOptions(apiToken);
  console.log('Token', apiToken);
  return fetch(`${url}/files?q=${qParams}&spaces=${storageFolder}`, options)
    .then(parseAndHandleErrors)
    .then((body) => {
      console.log(body);
      if (body && body.files && body.files.length > 0) {
        console.log('@aditya get files', body);
        return body.files[0];
      }
      return null;
    });
}

/**
 * upload file to google drive
 */
function uploadFile(
  apiToken,
  content,
  fileName,
  storageFolder,
  existingFileId,
) {
  const body = createMultipartBody(
    content,
    fileName,
    storageFolder,
    !!existingFileId,
  );
  const options = configurePostOptions(apiToken, body.length, !!existingFileId);
  return fetch(
    `${uploadUrl}/files${
      existingFileId ? `/${existingFileId}` : ''
    }?uploadType=multipart`,
    {
      ...options,
      body,
    },
  ).then(parseAndHandleErrors);
}

/**
 * handle error
 */
function parseAndHandleErrors(response) {
  console.log(response);
  if (response.ok) {
    return response.json();
  }
  return response.json().then((error) => {
    throw new Error(JSON.stringify(error));
  });
}

const GdriveUtils = {
  downloadFile,
  uploadFile,
  getFile,
  deleteFile,
};

export default GdriveUtils;
