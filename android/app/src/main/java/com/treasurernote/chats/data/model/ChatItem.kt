package com.treasurernote.chats.data.model

import android.os.Parcelable
import com.google.firebase.database.Exclude
import com.google.firebase.database.ServerValue
import kotlinx.android.parcel.Parcelize
import kotlinx.android.parcel.RawValue
import java.text.DateFormat

enum class ChatType{
    GROUP,
    PRIVATE
}
@Parcelize
data class ChatItem(
        var id: String = "",
        val firstPersonId: String = "",
        val otherPersonId: String? = "",
        var chatType: ChatType = ChatType.PRIVATE,
        val chatName: String = "",
        val chatImage: String = "",
        val lastMessage: String = "",
        val lastMessageSenderId: String = "",
        val unreadMessageCount: Int = 0,
        val lastMessageServerTime: @RawValue Any = ServerValue.TIMESTAMP,
//        val memberUpdated : String? = "",
        //TODO: Instead of memberUpdated we can use message from the updated user as an enum and check if it is otherPersonId with member updated enum then we will re-fetch chatname and imageUrl
): Parcelable{

    @Exclude
    fun getLastMessageTime(): Long? {
        return if (lastMessageServerTime is Long) {
            lastMessageServerTime.toLong()
        } else {
            null
        }
    }


    val getFormatedLastMessageTime : String?
        @Exclude
        get() {
            return if (lastMessageServerTime is Long) {
                DateFormat.getTimeInstance().format(lastMessageServerTime)
            } else {
                null
            }

        }
}