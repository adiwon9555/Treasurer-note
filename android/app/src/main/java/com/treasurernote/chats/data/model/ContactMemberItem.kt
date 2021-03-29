package com.treasurernote.chats.data.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import java.text.DateFormat

@Parcelize
data class ContactMemberItem(
        val profileName: String,
        val profileImage: String?,
        val phoneNumber: String?,
        val email: String?,
        val egf : String? = null,
        val hasAppInstalled: Boolean = false,
        val id: String = "0",

): Parcelable