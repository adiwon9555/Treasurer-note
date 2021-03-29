package com.treasurernote.chats.data.model

import java.text.DateFormat

data class MessageItem(
        val id: Int = 0,
        val text : String,
        val imageUrl : String,
        val ownerId : String,
        val ownerName : String,
        val time : Long,
) {
    val formattedTime : String
        get() = DateFormat.getTimeInstance().format(time)

}