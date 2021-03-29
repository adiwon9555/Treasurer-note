package com.treasurernote.chats.ui.newChatTabs

import android.Manifest
import android.app.AlertDialog
import android.content.DialogInterface
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import androidx.fragment.app.Fragment
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.rt2zz.reactnativecontacts.ContactsProvider
import com.treasurernote.MainActivity
import com.treasurernote.MainApplication
import com.treasurernote.R
import com.treasurernote.chats.data.model.ContactMemberItem
import com.treasurernote.databinding.ContactMemberListFragmentBinding
import com.treasurernote.utils.AsyncStorage

enum class LIST_TYPE {
    CONTACT,
    MEMBER
}


class ContactMemberListFragment(private val listType: LIST_TYPE) : Fragment(R.layout.contact_member_list_fragment) {
    companion object{
        private const val TAG = "ContactMemberListFragme"
        private const val PERMISSIONS_REQUEST_READ_CONTACTS = 101
    }
    private val contactMemberAdapter = ContactMemberAdapter()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val binding = ContactMemberListFragmentBinding.bind(view)
        binding.apply {
            contactMemberRecyclerView.apply {
                adapter = contactMemberAdapter
                setHasFixedSize(true)
            }
        }

        if(listType == LIST_TYPE.CONTACT){

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                checkPermissionForContacts()
            }
        }else{
            val memberList = mutableListOf<ContactMemberItem>(
                    ContactMemberItem("Member1","","2132134214","member1.mem.com",id="1"),
                    ContactMemberItem("Member2","","324234","member2.mem.com",id="2")
            )
            val mL = AsyncStorage(MainApplication.getReactContext()).fetchKey("MemberReducer","memberList")
            contactMemberAdapter.submitList(mL)
        }

    }

    private fun getContacts(){
        val cr = requireContext().contentResolver

        val contactsProvider = ContactsProvider(cr)
        val contacts = getFormattedContacts(contactsProvider.contacts)
        contactMemberAdapter.submitList(contacts)
    }

    @RequiresApi(Build.VERSION_CODES.M)
    private fun checkPermissionForContacts(){
        if( requireContext().checkSelfPermission( Manifest.permission.READ_CONTACTS ) != PackageManager.PERMISSION_GRANTED ){
            requestPermissions(arrayOf(Manifest.permission.READ_CONTACTS), PERMISSIONS_REQUEST_READ_CONTACTS);
        }else{
            getContacts()
        }

    }


    override fun onRequestPermissionsResult(requestCode: Int,
                                   permissions: Array<String?>, grantResults: IntArray) {
        when (requestCode) {
            PERMISSIONS_REQUEST_READ_CONTACTS -> {

                // If request is cancelled, the result arrays are empty.
                if (grantResults.size > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                    // permission was granted.
                    getContacts()
                } else {
                    // permission denied.
                    // tell the user the action is cancelled
                    val alertDialog: AlertDialog = AlertDialog.Builder(activity).create()
                    alertDialog.setMessage("Please allow Permission for Treasurer app in Settings Page to view Contacts")
                    alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK"){ dialog, _ ->
                        dialog.dismiss()
                    }
                    alertDialog.show()
                }
                return
            }
        }
    }





    private fun getFormattedContacts(contacts: WritableArray) : MutableList<ContactMemberItem>{
        val formattedContactMemberList: MutableList<ContactMemberItem> = mutableListOf()
        for (i in 0 until contacts.size()){
            val contactMap = contacts.getMap(i)!!
            Log.d(TAG, "contactMap: @aditya"+contactMap)
            val profileName = contactMap.getString("givenName")!!
            val phoneNumbers = contactMap.getArray("phoneNumbers")!!
            var phoneNumber : String?
            if(phoneNumbers.size() > 0){
                phoneNumber = phoneNumbers.getMap(0)?.getString("number")
            }else{
                phoneNumber = ""
            }
            val emails = contactMap.getArray("emailAddresses")!!
            var email : String?
            if(emails.size() > 0){
                email = emails.getMap(0)?.getString("email")
            }else{
                email = ""
            }


            formattedContactMemberList.add(ContactMemberItem(profileName,"", phoneNumber,email))
        }
        return formattedContactMemberList
    }
}