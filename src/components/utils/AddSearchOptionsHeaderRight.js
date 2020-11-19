import React, {useCallback} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import fonts from '../../utils/fonts';
import MenuPopUpGeneral from './MenuPopUpGeneral';
import PopupMenu from './PopupMenu';
import {normalize} from './utils';

const MORE_OPTIONS = [
  'Add new contact',
  'Import Contacts',
  'Export to Excel',
  'Restore from Excel',
];

const AddSearchOptionsHeaderRight = React.memo(
  ({
    navigation,
    openAddModal,
    toggleSearch,
    searchIcon,
    saveExcel,
    openImportContact,
    showPopUpMenu,
  }) => {
    const {iconContainer, iconStyle} = styles;
    // const _onPopupEvent = useCallback(
    //   (eventName, index) => {
    //     console.log('@aditya', eventName, index);
    //     if (eventName !== 'itemSelected') {
    //       return;
    //     }
    //     switch (index) {
    //       case 0:
    //         openAddModal();
    //         break;

    //       case 1:
    //         openImportContact();
    //         break;
    //       case 2:
    //         saveExcel();
    //         break;
    //       default:
    //         break;
    //     }
    //   },
    //   [openAddModal, saveExcel, openImportContact],
    // );
    const _onPopupEvent = useCallback(
      (index) => {
        switch (index) {
          case 0:
            openAddModal();
            break;

          case 1:
            openImportContact();
            break;
          case 2:
            saveExcel();
            break;
          default:
            break;
        }
      },
      [openAddModal, saveExcel, openImportContact],
    );

    return (
      <View style={iconContainer}>
        {/* <TouchableOpacity onPress={saveExcel}>
        <Text style={iconStyle}>&#xf382;</Text>
      </TouchableOpacity> */}
        <TouchableOpacity onPress={toggleSearch} style={{}}>
          {searchIcon ? (
            <Text style={iconStyle}>&#xf002;</Text>
          ) : (
            <Text style={iconStyle}> </Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={openAddModal} style={{}}>
        <Text style={iconStyle}>&#xf055;</Text>
      </TouchableOpacity> */}
        {showPopUpMenu && (
          <View>
            {/* <PopupMenu
              iconStyle={styles.iconStyle}
              actions={MORE_OPTIONS}
              onPress={_onPopupEvent}
            /> */}
            <MenuPopUpGeneral
              iconStyle={styles.iconStyle}
              actions={MORE_OPTIONS}
              onPress={_onPopupEvent}
            />
          </View>
        )}
      </View>
    );
  },
);

const styles = {
  iconContainer: {
    paddingRight: normalize(15),
    flexDirection: 'row',
  },
  iconStyle: {
    fontFamily: fonts.solidIcons,
    fontSize: normalize(24),
    color: 'gray',
    margin: normalize(8),
    paddingLeft: normalize(10),
  },
};

export default AddSearchOptionsHeaderRight;
