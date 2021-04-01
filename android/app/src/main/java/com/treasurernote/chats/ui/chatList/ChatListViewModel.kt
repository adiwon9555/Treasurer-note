package com.treasurernote.chats.ui.chatList

import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.treasurernote.chats.data.model.ChatItem
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch

class ChatListViewModel @ViewModelInject constructor() : ViewModel(){
    private val chatListEventChannel = Channel<ChatListEvent>()
    val chatListEvent = chatListEventChannel.receiveAsFlow()


    fun onChatItemClicked(chatItem: ChatItem) = viewModelScope.launch {
        chatListEventChannel.send(ChatListEvent.NavigateToMessageListScreen(chatItem))
    }

    fun onNewChatClicked() = viewModelScope.launch {
        chatListEventChannel.send(ChatListEvent.NavigateToNewChatScreen)
    }


    sealed class ChatListEvent{
        data class NavigateToMessageListScreen(val chatItem: ChatItem) : ChatListEvent()
        object NavigateToNewChatScreen : ChatListEvent()
    }
}