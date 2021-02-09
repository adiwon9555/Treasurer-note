package com.treasurernote.chats

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.ui.setupActionBarWithNavController
import com.treasurernote.R
import kotlinx.android.synthetic.main.activity_chat_main.*

class ChatMainActivity: AppCompatActivity() {
    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat_main)
        val navHostFragmant =
                supportFragmentManager.findFragmentById(R.id.chat_nav_container) as NavHostFragment

        navController = navHostFragmant.findNavController()

        setSupportActionBar(chat_toolbar)
//        supportActionBar?.setHomeAsUpIndicator(R.drawable.ic_baseline_arrow_back_24);
//        supportActionBar?.setDisplayHomeAsUpEnabled(true);

        setupActionBarWithNavController(navController)
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp() || super.onSupportNavigateUp()
    }

}