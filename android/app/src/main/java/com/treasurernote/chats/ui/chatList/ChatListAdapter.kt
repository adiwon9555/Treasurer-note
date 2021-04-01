package com.treasurernote.chats.ui.chatList

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.treasurernote.chats.data.model.ChatItem
import com.treasurernote.databinding.ChatItemBinding

class ChatListAdapter(private val listener: ChatItemClickListener) : ListAdapter<ChatItem,ChatListAdapter.ChatListViewHolder>(DiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChatListViewHolder {
        val binding = ChatItemBinding.inflate(LayoutInflater.from(parent.context),parent,false)
        return ChatListViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ChatListViewHolder, position: Int) {
        val currentItem =  getItem(position)
        holder.bind(currentItem)
    }

    inner class ChatListViewHolder(private val binding: ChatItemBinding) : RecyclerView.ViewHolder(binding.root){

        init {
            binding.apply {
                root.setOnClickListener{
                    val position = adapterPosition
                    if(position != RecyclerView.NO_POSITION){
                        listener.onItemClick(getItem(position))
                    }
                }
            }
        }

        fun bind(chatItem: ChatItem){
            binding.apply {
                profileName.text = chatItem.profileName
                lastMessage.text = chatItem.lastMessage
                lastMessageTime.text = chatItem.getFormatedLastMessageTime
//                profileImage.setImageURI(Uri.parse(chatItem.profileImage))

            }

        }

    }

    interface ChatItemClickListener{
        fun onItemClick(chatItem: ChatItem)
    }
    class DiffCallback : DiffUtil.ItemCallback<ChatItem>() {
        override fun areItemsTheSame(oldItem: ChatItem, newItem: ChatItem) =
                oldItem.id == newItem.id

        override fun areContentsTheSame(oldItem: ChatItem, newItem: ChatItem) =
                oldItem == newItem

    }
}