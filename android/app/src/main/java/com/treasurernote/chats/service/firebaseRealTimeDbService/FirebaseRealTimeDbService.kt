package com.treasurernote.chats.service.firebaseRealTimeDbService

import android.util.Log
import com.google.firebase.database.*
import com.treasurernote.chats.data.model.ChatItem
import com.treasurernote.chats.data.model.ChatType
import com.treasurernote.chats.data.model.ContactMemberItem
import com.treasurernote.chats.data.model.MessageItem


class FirebaseRealTimeDbService(private val database: DatabaseReference) {
    //    private var database: DatabaseReference = Firebase.database.reference
    private val messageReference = database.child(MESSAGES)
    private val userReference = database.child(USER)
    private val chatReference = database.child(CHATS)
    private val chatMemberReference = database.child(CHAT_MEMBERS)
    private val userChatReference = database.child(USER_CHATS)
    private val userContactReference = database.child(USER_CONTACTS)


    companion object {
        private const val TAG = "FirebaseRealTimeDbService"
        private const val MESSAGES = "messages"
        private const val CHATS = "chats"
        private const val CHAT_MEMBERS = "chatMembers"
        private const val USER = "user"
        private const val USER_CHATS = "userChats"
        private const val USER_CONTACTS = "userContacts"
        //Should also contain chat between them
        //and if the contact or egf is registered with treasurer app
    }


    fun addNewNormalMessage(messageItem: MessageItem) {

        messageReference.child(messageItem.chatId).push().setValue(messageItem)
    }

    fun addNewChat(chatItem: ChatItem, members: List<ContactMemberItem>, messageItem: MessageItem) {
        val chatId = chatReference.push().key
        if (chatId != null) {
            chatItem.id = chatId
            messageItem.chatId = chatId
            messageItem.id = "firstMessage_$chatId"

            val childUpdates = hashMapOf<String, Any>(
                    "/$CHATS/$chatId" to chatItem,
                    "/$MESSAGES/$chatId/firstMessage_$chatId" to messageItem,
            )

//            members.forEach {   eachMember ->
//                childUpdates["/$USER_CHATS/${eachMember.id}/${chatId}"] = chatItem
//
//                userReference.child(eachMember.id).addListenerForSingleValueEvent(object : ValueEventListener {
//                    override fun onDataChange(dataSnapshot: DataSnapshot) {
//                        childUpdates["/$CHAT_MEMBERS/${chatId}/${eachMember.id}"] = dataSnapshot.value as ContactMemberItem
//                    }
//
//                    override fun onCancelled(databaseError: DatabaseError) {
//                        // Getting Post failed, log a message
//                        Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
//                    }
//                })
//            }
            //User detail should have been fetched in contact List page or EGF list page
            members.forEach { eachMember ->
                childUpdates["/$USER_CHATS/${eachMember.id}/${chatId}"] = chatItem
                childUpdates["/$CHAT_MEMBERS/${chatId}/${eachMember.id}"] = eachMember
            }

//            if(chatItem.chatType == ChatType.GROUP){
//                childUpdates["/$CHAT_MEMBERS/$chatId"] = members
//            }
            database.updateChildren(childUpdates)
        } else {
            Log.e(TAG, "addNewChat: Error creating chat key in db")
        }

    }

    //Assuming the members are details are fetched in contact List page or EGF list page
    fun addNewMembers(chatItem: ChatItem, members: List<ContactMemberItem>, senderDetail: ContactMemberItem) {
        val numbers = members.map { it.phoneNumber }
        //Update in message
        val messageId = messageReference.child(chatItem.id).push().key
        if (messageId != null) {
            val messageItem = MessageItem(
                    messageId,
                    senderDetail.phoneNumber + " added " + numbers.toString(),
                    "",
                    senderDetail.id,
                    senderDetail.profileName,
                    chatItem.id,
                    MessageItem.MessageType.INFO,
                    MessageItem.InfoType.MEMBER_ADDED
            )

            val childUpdates = hashMapOf<String, Any>(
                    "/$MESSAGES/${chatItem.id}/$messageId" to messageItem,
            )
            members.forEach { member ->
                childUpdates["/$CHAT_MEMBERS/${chatItem.id}/${member.id}"] = member
                childUpdates["/$USER_CHATS/${member.id}/${chatItem.id}"] = chatItem
            }
            database.updateChildren(childUpdates)
        } else {
            Log.e(TAG, "addNewMember: Error creating message key in db")
        }
    }

    fun addNewUser(contactMemberItem: ContactMemberItem) {
        //Update User
        database.child(USER).push().setValue(contactMemberItem)

    }

    fun sendMessage(messageItem: MessageItem) {
        val messageKey = messageReference.child(messageItem.chatId).push().key
        if (messageKey != null) {
            messageItem.id = messageKey

            val childUpdates = hashMapOf(
                    "/$CHATS/${messageItem.chatId}/lastMessage" to messageItem.text as String,
                    "/$CHATS/${messageItem.chatId}/lastMessageSenderId" to messageItem.senderId,
                    "/$CHATS/${messageItem.chatId}/lastMessageServerTime" to messageItem.serverTime,
                    "/$MESSAGES/${messageItem.chatId}/$messageKey" to messageItem
            )

            //Not sure if get() or addListenerForSingleValueEvent is required
            //TODO: Check if working properly when new member added
            chatMemberReference.child(messageItem.chatId).addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(dataSnapshot: DataSnapshot) {
                    val t = object : GenericTypeIndicator<Map<String, ContactMemberItem>>() {}
                    val memberMaps: Map<String, ContactMemberItem> = dataSnapshot.getValue(t)!!
                    val chatMembers = memberMaps.values.toList()
                    chatMembers.forEach {
                        childUpdates["/$USER_CHATS/${it.id}/${messageItem.chatId}/lastMessage"] = messageItem.text
                        childUpdates["/$USER_CHATS/${it.id}/${messageItem.chatId}/lastMessageSenderId"] = messageItem.senderId
                        childUpdates["/$USER_CHATS/${it.id}/${messageItem.chatId}/lastMessageServerTime"] = messageItem.serverTime
                    }
                    database.updateChildren(childUpdates)
                }

                override fun onCancelled(databaseError: DatabaseError) {
                    // Getting Post failed, log a message
                    Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
                }
            })

        }
    }

//    fun sendMessage(messageItem: MessageItem){
//        val messageKey = messageReference.child(messageItem.chatId).push().key
//        if(messageKey != null){
//            messageItem.id = messageKey
//
//            chatReference.child(messageItem.chatId).get().addOnSuccessListener { data ->
//                Log.i("firebase", "Got value ${data.value}")
//                if (data.value is ChatItem) {
//                    val chatItem = data.value as ChatItem
//                    val newChatItem = ChatItem(
//                            chatItem.id,
//                            chatItem.firstPersonId,
//                            chatItem.otherPersonId,
//                            chatItem.chatType,
//                            chatItem.chatName,
//                            chatItem.chatImage,
//                            messageItem.text!!,
//                            messageItem.senderId,
//                            chatItem.unreadMessageCount + 1,
//                            messageItem.serverTime
//                    )
//                    val childUpdates = hashMapOf(
//                            "/$CHATS/${messageItem.chatId}" to newChatItem,
//                            "/$MESSAGES/${messageItem.chatId}/$messageKey" to messageItem
//                    )
////                    val childUpdates = hashMapOf(
////                            "/$CHATS/${messageItem.chatId}/lastMessage" to messageItem.text as String,
////                            "/$CHATS/${messageItem.chatId}/lastMessageSenderId" to messageItem.senderId,
////                            "/$CHATS/${messageItem.chatId}/lastMessageServerTime" to messageItem.serverTime,
////                            "/$MESSAGES/${messageItem.chatId}/$messageKey" to messageItem
////                    )
//                    database.child(CHAT_MEMBERS).child(messageItem.chatId).get().addOnSuccessListener { data ->
//                        Log.i("firebase", "Got value ${data.value}")
//                        if (data.value is List<*>) {
//                            val chatMembers = data.value as List<ContactMemberItem>
//                            chatMembers.forEach { childUpdates["/$USER_CHATS/${it.id}/${messageItem.chatId}"] = newChatItem }
//                        }
//
//                        database.updateChildren(childUpdates)
//                    }.addOnFailureListener {
//                        Log.e("firebase", "Error getting data", it)
//                    }
//                }
//            }.addOnFailureListener {
//                Log.e("firebase", "Error getting data", it)
//            }
//        }else{
//            Log.e(TAG, "addNewChat: Error creating chat key in db" )
//        }
//    }

    fun deleteMessage(messageItem: MessageItem, forAll: Boolean = false) {
    }

    fun editMessage(messageItem: MessageItem) {

    }

    fun deleteChat(messageItem: MessageItem) {
    }

    fun deleteMultiMessage(messageItems: List<MessageItem>, forAll: Boolean = false) {

    }

    fun deleteUser(contactMemberItem: ContactMemberItem) {
    }

//    //This is a heavy operation and is supposed to happen from server
//    fun updateMember(contactMemberItem: ContactMemberItem, valuesToUpdate : Set<String>){
//        try {
//            //Change to single event listener
//            database.child(USER).child(contactMemberItem.id).get().addOnSuccessListener { oldUserSnapshot ->
//                Log.i(TAG, "updateMember : Got value user in ${oldUserSnapshot.value}")
//
//                val oldUser = oldUserSnapshot.value as ContactMemberItem
//                valuesToUpdate.forEach{
//                    when(it){
//                        ContactMemberItem.Constants.PROFILE_NAME -> oldUser.profileName = contactMemberItem.profileName
//                        ContactMemberItem.Constants.PROFILE_IMAGE -> oldUser.profileImage = contactMemberItem.profileImage
//                        ContactMemberItem.Constants.EMAIL -> oldUser.email = contactMemberItem.email
//                        ContactMemberItem.Constants.EGF -> oldUser.egf = contactMemberItem.egf
//                        ContactMemberItem.Constants.HAS_APP_INSTALLED -> oldUser.hasAppInstalled = contactMemberItem.hasAppInstalled
//                        ContactMemberItem.Constants.SELF_NAME -> oldUser.selfName = contactMemberItem.selfName
//                    }
//                }
//                val childUpdates = hashMapOf<String, Any>(
//                        "/$USER/${contactMemberItem.id}" to oldUser,
//                )
//                if(valuesToUpdate.contains(ContactMemberItem.Constants.PROFILE_IMAGE) || valuesToUpdate.contains((ContactMemberItem.Constants.PROFILE_NAME))){
//                    database.child(USER_CHATS).child(oldUser.id).get().addOnSuccessListener {   data ->
//                        Log.i("firebase", "Got value ${data.value}")
//                        if (data.value is List<*>) {
//                            val chats = data.value as List<ChatItem>
//                            chats.forEach {
//                                val messageKey = database.child(MESSAGES).child(it.id).push().key!!
//                                val messageItem = MessageItem(
//                                        messageKey,
//                                        "${contactMemberItem.phoneNumber} updated Profile",
//                                        "",
//                                        contactMemberItem.id,
//                                        contactMemberItem.profileName,
//                                        it.id,
//                                        MessageItem.MessageType.INFO,
//                                        MessageItem.InfoType.MEMBER_UPDATED
//                                )
//                                if(it.chatType == ChatType.PRIVATE){
//                                    if(it.chatName != contactMemberItem.profileName){
//                                        childUpdates["/$CHATS/${it.id}/chatName"] = contactMemberItem.profileName
//                                        childUpdates["/$USER_CHATS/${it.id}/chatName"] = contactMemberItem.profileName
//                                    }
//                                    if(it.chatImage != contactMemberItem.profileImage){
//                                        childUpdates["/$CHATS/${it.id}/chatImage"] = contactMemberItem.profileImage!!
//                                        childUpdates["/$USER_CHATS/${it.id}/chatImage"] = contactMemberItem.profileImage!!
//                                    }
//                                    childUpdates["/$MESSAGES/${it.id}/$messageKey"] = messageItem
//                                }
//                                childUpdates["/$CHAT_MEMBERS/${it.id}/${oldUser.id}"] = oldUser
//                            }
//                            database.updateChildren(childUpdates)
//                        }
//                    }.addOnFailureListener{
//                        Log.e("firebase", "Error getting data", it)
//                    }
//                }
//
//            }.addOnFailureListener{
//                Log.e("firebase", "Error getting data", it)
//            }
//        }catch (e: Exception){
//            Log.e(TAG,"Error Updating Member ",e)
//        }
//    }

    //This is a heavy operation and is supposed to happen from server
    fun updateMember(contactMemberItem: ContactMemberItem) {
        try {
            //Change to single event listener
            //Assuming the user calls for details before only and contactMemberItem contains all valid data
            val childUpdates = hashMapOf<String, Any>(
                    "/$USER/${contactMemberItem.id}" to contactMemberItem,
            )
            database.child(USER_CHATS).child(contactMemberItem.id).get().addOnSuccessListener { data ->
                Log.i("firebase", "Got value ${data.value}")
                val t = object : GenericTypeIndicator<Map<String, ChatItem>>() {}
                val chatsMap: Map<String, ChatItem> = data.getValue(t)!!
                val chats = chatsMap.values.toList()
                chats.forEach {
                    val messageKey = database.child(MESSAGES).child(it.id).push().key!!
                    val messageItem = MessageItem(
                            messageKey,
                            "${contactMemberItem.phoneNumber} updated Profile",
                            "",
                            contactMemberItem.id,
                            contactMemberItem.profileName,
                            it.id,
                            MessageItem.MessageType.INFO,
                            MessageItem.InfoType.MEMBER_UPDATED
                    )
                    if (it.chatType == ChatType.PRIVATE) {
                        if (it.chatName != contactMemberItem.profileName) {
                            childUpdates["/$CHATS/${it.id}/chatName"] = contactMemberItem.profileName
                            childUpdates["/$USER_CHATS/${it.id}/chatName"] = contactMemberItem.profileName
                        }
                        if (it.chatImage != contactMemberItem.profileImage) {
                            childUpdates["/$CHATS/${it.id}/chatImage"] = contactMemberItem.profileImage!!
                            childUpdates["/$USER_CHATS/${it.id}/chatImage"] = contactMemberItem.profileImage!!
                        }

                    }
                    //I can choose not to send message
//                    childUpdates["/$MESSAGES/${it.id}/$messageKey"] = messageItem
                    childUpdates["/$CHAT_MEMBERS/${it.id}/${contactMemberItem.id}"] = contactMemberItem
                }
                database.updateChildren(childUpdates)
            }.addOnFailureListener {
                Log.e("firebase", "Error getting data", it)
            }

        } catch (e: Exception) {
            Log.e(TAG, "Error Updating Member ", e)
        }
    }

    private val messageEventListener = object : ValueEventListener {
        override fun onDataChange(dataSnapshot: DataSnapshot) {
            val t = object : GenericTypeIndicator<Map<String, MessageItem>>() {}
            val messageMaps: Map<String, MessageItem> = dataSnapshot.getValue(t)!!
            val list = messageMaps.values.toList()
        }

        override fun onCancelled(databaseError: DatabaseError) {
            Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
        }
    }

    fun removeMessageListUpdatedListener(messageId: String) {
        messageReference.child(messageId).removeEventListener(messageEventListener)
    }

    fun addMessageListUpdatedListener(messageId: String) {

        messageReference.child(messageId).addValueEventListener(messageEventListener)
    }

    private val chatListUpdatedListener = object : ValueEventListener {
        override fun onDataChange(dataSnapshot: DataSnapshot) {
            val t = object : GenericTypeIndicator<Map<String, ChatItem>>() {}
            val chatsMap: Map<String, ChatItem> = dataSnapshot.getValue(t)!!
            val list = chatsMap.values.toList()
            Log.d(TAG, "onDataChange: @aditya chatlist" + list)
//            for (postSnapshot in dataSnapshot.children) {
//                // TODO: submit list to chatListadapter
//                Log.d(TAG, "onDataChange: postSnapshot "+postSnapshot)
//            }
        }

        override fun onCancelled(databaseError: DatabaseError) {
            Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
        }
    }

    fun removeChatListUpdatedListener(userId: String) {
        userChatReference.child(userId).removeEventListener(chatListUpdatedListener)

    }

    fun addChatListUpdatedListener(userId: String) {
        userChatReference.child(userId).addValueEventListener(chatListUpdatedListener)
    }

    private val chatMemberListUpdatedListener = object : ValueEventListener {
        override fun onDataChange(dataSnapshot: DataSnapshot) {
            val t = object : GenericTypeIndicator<Map<String, ContactMemberItem>>() {}
            val memberMaps: Map<String, ContactMemberItem> = dataSnapshot.getValue(t)!!
            val list = memberMaps.values.toList()
        }

        override fun onCancelled(databaseError: DatabaseError) {
            Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
        }
    }

    fun removeChatMemberListUpdatedListener(chatId: String) {
        chatMemberReference.child(chatId).removeEventListener(chatMemberListUpdatedListener)

    }

    fun addChatMemberListUpdatedListener(chatId: String) {
        chatMemberReference.child(chatId).addValueEventListener(chatMemberListUpdatedListener)
    }

    private val userContactListUpdatedListener = object : ValueEventListener {
        override fun onDataChange(dataSnapshot: DataSnapshot) {
            val t = object : GenericTypeIndicator<Map<String, ContactMemberItem>>() {}
            val memberMaps: Map<String, ContactMemberItem> = dataSnapshot.getValue(t)!!
            val list = memberMaps.values.toList()
        }

        override fun onCancelled(databaseError: DatabaseError) {
            Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
        }
    }

    fun removeUserContactListUpdatedListener(userId: String) {
        userContactReference.child(userId).removeEventListener(userContactListUpdatedListener)

    }

    fun addUserContactListUpdatedListener(userId: String) {
        userContactReference.child(userId).addValueEventListener(userContactListUpdatedListener)
    }


}