package com.treasurernote.chats.ui.newChatTabs

import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.treasurernote.chats.data.model.ContactMemberItem
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch


class ContactMemberViewModel @ViewModelInject constructor() : ViewModel(){
    private val contactMemberEventChannel = Channel<ContactMemberEvent>()
    val contactMemberEvent = contactMemberEventChannel.receiveAsFlow()

    fun onContactMemberItemClick(contactMemberItem: ContactMemberItem) {
        viewModelScope.launch {
            contactMemberEventChannel.send(ContactMemberEvent.NavigateToMessageScreen(contactMemberItem))
        }
    }

    sealed class ContactMemberEvent{
        data class NavigateToMessageScreen(val contactMemberItem: ContactMemberItem) : ContactMemberEvent()
    }

}