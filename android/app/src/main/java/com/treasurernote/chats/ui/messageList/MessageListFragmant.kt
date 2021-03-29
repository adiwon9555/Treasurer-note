package com.treasurernote.chats.ui.messageList

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.DividerItemDecoration
import com.treasurernote.R
import com.treasurernote.chats.data.model.ChatItem
import com.treasurernote.chats.data.model.MessageItem
import com.treasurernote.chats.ui.chatList.ChatListAdapter
import com.treasurernote.chats.ui.chatList.ChatListFragmentDirections
import com.treasurernote.databinding.FragmentChatListBinding
import com.treasurernote.databinding.MessageListBinding

class MessageListFragmant : Fragment(R.layout.message_list) {
    var _binding: MessageListBinding? = null

    val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = MessageListBinding.bind(view)

        val messageListAdapter = MessageListAdapter()
        binding.apply {
            messageListRecyclerView.apply {
                adapter = messageListAdapter
                setHasFixedSize(true)
            }
        }
        val messageList = listOf<MessageItem>(
                MessageItem(0,"Hello","asdasd","4234","Rashmie",243212),
                MessageItem(1,"Hi","asdasd","4234","Aditya",243212),
                MessageItem(3,"Whats up","asdasd","4234","Rashmie",243212)

        )
        messageListAdapter.submitList(messageList)
    }
}