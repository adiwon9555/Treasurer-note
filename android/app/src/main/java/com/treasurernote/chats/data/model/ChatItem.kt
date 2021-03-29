package com.treasurernote.chats.data.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import java.text.DateFormat

@Parcelize
data class ChatItem(
        val profileName: String,
        val profileImage: String,
        val lastMessageTime: Long,
        val lastMessage: String,
        val unreadMessageCount: Int,
        val id: Int = 0
): Parcelable{
    val getFormatedLastMessageTime: String
        get() = DateFormat.getTimeInstance().format(lastMessageTime)
}