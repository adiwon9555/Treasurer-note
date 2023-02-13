package com.treasurernote.chats.ui.newChatTabs

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.treasurernote.chats.data.model.ChatItem
import com.treasurernote.chats.data.model.ContactMemberItem
import com.treasurernote.databinding.ChatItemBinding
import com.treasurernote.databinding.ContactMemberItemBinding
import com.treasurernote.databinding.ContactMemberListFragmentBinding

class ContactMemberAdapter(private val listener : ContactMemberItemClickListener) : ListAdapter<ContactMemberItem,ContactMemberAdapter.ContactMemberViewHolder>(DiffCallback()) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ContactMemberViewHolder {
        val binding = ContactMemberItemBinding.inflate(LayoutInflater.from(parent.context),parent,false)
        return ContactMemberViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ContactMemberViewHolder, position: Int) {
        val currentItem =  getItem(position)
        holder.bind(currentItem)
    }

    inner class ContactMemberViewHolder(private val binding: ContactMemberItemBinding) : RecyclerView.ViewHolder(binding.root){

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

        fun bind(ContactMemberItem: ContactMemberItem){
            binding.apply {
                contactName.text = ContactMemberItem.profileName
                phoneNumber.text = ContactMemberItem.phoneNumber.toString()
                egf.text = ContactMemberItem.egf
//                profileImage.setImageURI(Uri.parse(ContactMemberItem.profileImage))

            }

        }

    }

    interface ContactMemberItemClickListener{
        fun onItemClick(contactMemberItem: ContactMemberItem)
    }
    class DiffCallback : DiffUtil.ItemCallback<ContactMemberItem>() {
        override fun areItemsTheSame(oldItem: ContactMemberItem, newItem: ContactMemberItem) =
                oldItem.id == newItem.id

        override fun areContentsTheSame(oldItem: ContactMemberItem, newItem: ContactMemberItem) =
                oldItem == newItem

    }
}