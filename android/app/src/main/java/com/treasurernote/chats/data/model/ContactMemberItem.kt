package com.treasurernote.chats.data.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import java.text.DateFormat

@Parcelize
data class ContactMemberItem(
        val id: String = "-1",
        var profileName: String,
        var profileImage: String?,
        val phoneNumber: String?,
        var email: String?,
        var egf : String? = null,
        var hasAppInstalled: Boolean? = false,
        var selfName: String? = "",
): Parcelable{
    class Constants{
        companion object{
            const val PROFILE_IMAGE = "profileImage"
            const val PROFILE_NAME = "profileName"
            const val EMAIL = "email"
            const val EGF = "egf"
            const val HAS_APP_INSTALLED = "hasAppInstalled"
            const val SELF_NAME = "selfName"
        }
    }
}