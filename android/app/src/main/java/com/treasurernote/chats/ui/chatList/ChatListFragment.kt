package com.treasurernote.chats.ui.chatList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.DividerItemDecoration
import com.treasurernote.R
import com.treasurernote.chats.data.model.ChatItem
import com.treasurernote.databinding.FragmentChatListBinding


class ChatListFragment : Fragment(R.layout.fragment_chat_list) {
    var _binding: FragmentChatListBinding? = null

    val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        (activity as AppCompatActivity).supportActionBar!!.setDisplayHomeAsUpEnabled(true)

        return super.onCreateView(inflater, container, savedInstanceState)

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentChatListBinding.bind(view)

//        val itemDecorator = DividerItemDecoration(context, DividerItemDecoration.VERTICAL)
//        context?.let { ContextCompat.getDrawable(it, R.drawable.chat_list_divider)?.let { itemDecorator.setDrawable(it) } }
        val chatListAdapter = ChatListAdapter(object : ChatListAdapter.ChatItemClickListener{
            override fun onItemClick(chatItem: ChatItem) {
//                TODO("Give Command to ViewModel later")
                val title = chatItem.profileName
                val action = ChatListFragmentDirections.actionChatListFragmentToMessageListFragmant(title)
                findNavController().navigate(action)
            }
        })
        binding.apply {
            chatRecyclerView.apply {
                adapter = chatListAdapter
                setHasFixedSize(true)
                addItemDecoration(DividerItemDecoration(context,
                        DividerItemDecoration.VERTICAL))
//                addItemDecoration(itemDecorator)

            }
            fabNewChat.setOnClickListener {
                val action = ChatListFragmentDirections.actionChatListFragmentToNewChatTabsFragmant2()
                findNavController().navigate(action)
//                val action = ChatListFragmentDirections.actionChatListFragmentToMessageListFragmant()
//                findNavController().navigate(action)
            }
        }
        val chatList = listOf<ChatItem>(
                ChatItem("Aditya","9832644367", "", 1612970970603, "This is last message", 1,1),
                ChatItem("Rashmie","", "", 1612970970603, "This is second message", 2,2),
                ChatItem("Ritik", "","https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia-exp1.licdn.com%2Fdms%2Fimage%2FC5603AQHxp-TWDdflPA%2Fprofile-displayphoto-shrink_200_200%2F0%3Fe%3D1609977600%26v%3Dbeta%26t%3DlwKOpQW5vNi3IWAGoRWHBgy5Vo4H2dIWZcwqu8Oz_6g&imgrefurl=https%3A%2F%2Fin.linkedin.com%2Fin%2Fritik-garg-4b76b3129&tbnid=E7ys37pkhHqAfM&vet=12ahUKEwiorPrb0d_uAhWERnwKHULICnMQMyg_egQIARBC..i&docid=qoeNBHY50j-ChM&w=200&h=200&itg=1&q=ritik%20garg&ved=2ahUKEwiorPrb0d_uAhWERnwKHULICnMQMyg_egQIARBC", 1612970970603, "This is third message", 3),
        )
        chatListAdapter.submitList(chatList)




    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}