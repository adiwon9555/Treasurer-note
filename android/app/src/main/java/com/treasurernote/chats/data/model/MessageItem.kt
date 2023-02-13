package com.treasurernote.chats.data.model

import com.google.firebase.database.Exclude
import com.google.firebase.database.ServerValue
import java.text.DateFormat


data class MessageItem(
        var id: String,
        val text: String?,
        val imageUrl: String?,
        val senderId: String,
        val senderName: String,
        var chatId: String,
        val messageType: MessageType = MessageType.NORMAL,
        val infoType: InfoType? = InfoType.EMPTY,
        val serverTime: Any = ServerValue.TIMESTAMP,
        ) {

    @Exclude
    fun getServerTimeLong(): Long? {
        return if (serverTime is Long) {
            serverTime.toLong()
        } else {
            null
        }
    }


    val formattedTime : String?
        @Exclude
        get() {
                return if (serverTime is Long) {
                    DateFormat.getTimeInstance().format(serverTime)
                } else {
                    null
                }

        }

    enum class MessageType{
        NORMAL,
        INFO,
        INVISIBLE_INFO;
    }
//    enum class InfoTextType(val infoText: String){
//        MEMBER_UPDATED("MEMBER_UPDATED"),
//        MEMBER_LEFT(" left"),
//        MEMBER_ADDED(" added");
//
//        private var value: String = infoText
//
//    }
    enum class InfoType{
        EMPTY,
        MEMBER_UPDATED,
        MEMBER_LEFT,
        MEMBER_ADDED,
        MEMBER_REMOVED,
        DATE_CHANGED,
        CHAT_IMAGE_UPDATED,
        CHAT_NAME_UPDATED,
    }
}
