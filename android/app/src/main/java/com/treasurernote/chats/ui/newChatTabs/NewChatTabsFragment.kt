package com.treasurernote.chats.ui.newChatTabs

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.treasurernote.R
import kotlinx.android.synthetic.main.new_chat_tabs.view.*


class NewChatTabsFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.new_chat_tabs,container,false)
        val fragmentList : ArrayList<Fragment> = arrayListOf(
                ContactMemberListFragment(LIST_TYPE.MEMBER),
                ContactMemberListFragment(LIST_TYPE.CONTACT)
        )
        val newChatTabAdapter = NewChatTabAdapter(fragmentList,requireActivity().supportFragmentManager,lifecycle)
        view.view_pager.adapter = newChatTabAdapter

        TabLayoutMediator(view.tabs,view.view_pager){tab : TabLayout.Tab ,position: Int ->
            when(position){
                0 -> {
                    tab.text = "Members"
                }
                1 -> {
                    tab.text = "Contacts"
                }
            }
        }.attach()

        return view
    }

}