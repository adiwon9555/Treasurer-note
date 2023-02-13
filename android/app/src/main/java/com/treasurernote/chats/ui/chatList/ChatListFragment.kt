package com.treasurernote.chats.ui.chatList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.DividerItemDecoration
import com.facebook.infer.annotation.Mutable
import com.google.firebase.database.ServerValue
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import com.treasurernote.R
import com.treasurernote.chats.data.model.ChatItem
import com.treasurernote.chats.data.model.ChatType
import com.treasurernote.chats.data.model.ContactMemberItem
import com.treasurernote.chats.data.model.MessageItem
import com.treasurernote.chats.service.firebaseRealTimeDbService.FirebaseRealTimeDbService
import com.treasurernote.databinding.FragmentChatListBinding
import com.treasurernote.utils.exhaustive
import kotlinx.coroutines.flow.collect


class ChatListFragment : Fragment(R.layout.fragment_chat_list) {
    var _binding: FragmentChatListBinding? = null
    private lateinit var firebaseRealTimeDbService : FirebaseRealTimeDbService

    val binding get() = _binding!!

    private val viewModel : ChatListViewModel by viewModels()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        (activity as AppCompatActivity).supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        firebaseRealTimeDbService = FirebaseRealTimeDbService(Firebase.database.reference)
        return super.onCreateView(inflater, container, savedInstanceState)

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentChatListBinding.bind(view)
        firebaseRealTimeDbService.addChatListUpdatedListener("9832644367")

//        val itemDecorator = DividerItemDecoration(context, DividerItemDecoration.VERTICAL)
//        context?.let { ContextCompat.getDrawable(it, R.drawable.chat_list_divider)?.let { itemDecorator.setDrawable(it) } }
        val chatListAdapter = ChatListAdapter(object : ChatListAdapter.ChatItemClickListener{
            override fun onItemClick(chatItem: ChatItem) {
                viewModel.onChatItemClicked(chatItem)
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
                viewModel.onNewChatClicked()
            }
        }
        val chatList = listOf<ChatItem>(
                ChatItem("","9832644367","9832644367", ChatType.PRIVATE,"Aditya","",  "This is last message", "9832644367",1),
                ChatItem("","9832644367","8906777031", ChatType.PRIVATE,"Rashmie","",  "This is last message", "8906777031",1),
                ChatItem("","9832644367","9876543210", ChatType.PRIVATE,"Ritik","",  "This is last message", "9876543210",0),
        )
        chatListAdapter.submitList(chatList)

        viewLifecycleOwner.lifecycleScope.launchWhenStarted {
            viewModel.chatListEvent.collect { events ->
                when(events){
                    is ChatListViewModel.ChatListEvent.NavigateToMessageListScreen -> {
                        val title = events.chatItem.chatName
                        val action = ChatListFragmentDirections.actionChatListFragmentToMessageListFragmant(title)
                        findNavController().navigate(action)
                    }
                    is ChatListViewModel.ChatListEvent.NavigateToNewChatScreen -> {
//                        val action = ChatListFragmentDirections.actionChatListFragmentToNewChatTabsFragmant2()
//                        findNavController().navigate(action)
                        val chatItem = ChatItem("","9832644367","8906777031", ChatType.PRIVATE,"Rashmie","",  "This is last message", "9832644367",1);
                        val memberList = mutableListOf<ContactMemberItem>(
                                ContactMemberItem("9832644367","Aditya","","9832644367","member1.mem.com"),
                                ContactMemberItem("8906777031","Rashmie","","8906777031","member2.mem.com")
                        )
//                        val messageItem = MessageItem("","new Hello bello","","1","Member1","")
//                        firebaseRealTimeDbService.addNewChat(chatItem,memberList,messageItem)
                        val messageItem = MessageItem("","text 2","","9832644367","Aditya","")
                        firebaseRealTimeDbService.addNewChat(chatItem,memberList,messageItem)
                    }
                }.exhaustive
            }
        }



    }

    override fun onDestroyView() {
        super.onDestroyView()
        firebaseRealTimeDbService.addChatListUpdatedListener("9832644367")
        _binding = null
    }

}