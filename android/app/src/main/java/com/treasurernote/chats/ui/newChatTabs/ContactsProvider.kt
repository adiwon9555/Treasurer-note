package com.treasurernote.chats.ui.newChatTabs

import android.content.ContentResolver
import android.content.ContentUris
import android.content.Context
import android.database.Cursor
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.provider.ContactsContract
import com.treasurernote.chats.data.model.ContactMemberItem
import java.io.InputStream


//Not using, kept for reference
class ContactsProvider(private val contentResolver: ContentResolver) {
    val contacts : MutableList<ContactMemberItem>
    get(){
        val list: MutableList<ContactMemberItem> = ArrayList()
        val cursor: Cursor = contentResolver.query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null)!!
        if (cursor.getCount() > 0) {
            while (cursor.moveToNext()) {
                val id: String = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID))
                if (cursor.getInt(cursor.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER)) > 0) {
                    val cursorInfo: Cursor = contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?", arrayOf(id), null)!!
                    val inputStream: InputStream = ContactsContract.Contacts.openContactPhotoInputStream(contentResolver,
                            ContentUris.withAppendedId(ContactsContract.Contacts.CONTENT_URI, id.toLong()))
                    val person: Uri = ContentUris.withAppendedId(ContactsContract.Contacts.CONTENT_URI, id.toLong())
                    val pURI: Uri = Uri.withAppendedPath(person, ContactsContract.Contacts.Photo.CONTENT_DIRECTORY)
                    var photo: Bitmap? = null
                    if (inputStream != null) {
                        photo = BitmapFactory.decodeStream(inputStream)
                    }
                    while (cursorInfo.moveToNext()) {

                        val id = id
                        val name = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME))
                        val phone = cursorInfo.getString(cursorInfo.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER))
                        val photo = photo
                        val photoURI = pURI
                        val info = ContactMemberItem(id,name,photoURI.toString(),phone,"")
                        list.add(info)
                    }
                    cursorInfo.close()
                }
            }
            cursor.close()
        }
        return list
    }
}