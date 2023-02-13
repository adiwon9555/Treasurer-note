package com.treasurernote.chats.ui.messageList

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import com.treasurernote.R
import com.treasurernote.chats.data.model.MessageItem
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
                MessageItem("0","Hello","asdasd","4234","Rashmie","1"),
                MessageItem("1","Hi","asdasd","4234","Aditya","2"),
                MessageItem("3","Whats up","asdasd","4234","Rashmie","3")

        )
        messageListAdapter.submitList(messageList)
    }
}