package com.treasurernote.chats

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.ui.setupActionBarWithNavController
import com.google.android.gms.common.GoogleApiAvailability
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
import com.treasurernote.R
import kotlinx.android.synthetic.main.activity_chat_main.*


class ChatMainActivity: AppCompatActivity() {
    private lateinit var navController: NavController
    companion object {
        private const val TAG = "ChatMainActivity"
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat_main)
        val navHostFragmant =
                supportFragmentManager.findFragmentById(R.id.chat_nav_container) as NavHostFragment

        navController = navHostFragmant.findNavController()

        setSupportActionBar(chat_toolbar)

        setupActionBarWithNavController(navController)
        getLatestFCMToken()
    }

    fun getLatestFCMToken(){
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            if (!task.isSuccessful) {
                Log.w(TAG, "Fetching FCM registration token failed", task.exception)
                return@OnCompleteListener
            }

            // Get new FCM registration token
            val token = task.result

            // Log and toast
//            val msg = getString(R.string.msg_token_fmt token)
            val msg = token.toString();
            Log.d(TAG, msg)
//            Toast.makeText(baseContext, msg, Toast.LENGTH_SHORT).show()
        })

    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp() || super.onSupportNavigateUp()
    }

}