package com.treasurernote.chats.ui.messageList

import android.renderscript.ScriptGroup
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import androidx.viewbinding.ViewBinding
import com.treasurernote.chats.data.model.ChatItem
import com.treasurernote.chats.data.model.MessageItem
import com.treasurernote.databinding.MessageLeftBinding
import com.treasurernote.databinding.MessageRightBinding

class MessageListAdapter : ListAdapter<MessageItem,MessageListAdapter.MessageListViewHolder>(DiffCallback()){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MessageListViewHolder {
        return if(viewType == 0){
            val binding = MessageLeftBinding.inflate(LayoutInflater.from(parent.context),parent,false)
            MessageListViewHolder(binding,0)
        }else{
            val binding = MessageRightBinding.inflate(LayoutInflater.from(parent.context),parent,false)
            MessageListViewHolder(binding,1)
        }
    }

    override fun onBindViewHolder(holder: MessageListViewHolder, position: Int) {
        val currentItem = getItem(position)
        holder.bind(currentItem)
    }

    override fun getItemViewType(position: Int): Int {
        return if(position % 2 == 0){
            0
        }else{
            1
        }
    }

    class MessageListViewHolder(val _binding: ViewBinding,val viewType: Int) : RecyclerView.ViewHolder(_binding.root){
        fun bind(messageItem: MessageItem){
            var binding : ViewBinding
            if(viewType == 0){
                binding = _binding as MessageLeftBinding
                binding.apply {
                    leftText.text = messageItem.text
                }
            }else{
                binding = _binding as MessageRightBinding
                binding.apply {
                    rightText.text = messageItem.text
                }
            }
        }

    }
    class DiffCallback : DiffUtil.ItemCallback<MessageItem>() {
        override fun areItemsTheSame(oldItem: MessageItem, newItem: MessageItem) =
                oldItem.id == newItem.id

        override fun areContentsTheSame(oldItem: MessageItem, newItem: MessageItem) =
                oldItem == newItem

    }
}