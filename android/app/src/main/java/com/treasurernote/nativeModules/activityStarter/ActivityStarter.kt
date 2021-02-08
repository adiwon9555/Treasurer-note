package com.treasurernote.nativeModules.activityStarter

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.treasurernote.chats.ChatMainActivity


class ActivityStarter(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ActivityStarter"
    }

    @ReactMethod
    fun navigateToChatActivity() {
        val context = reactApplicationContext
        val intent = Intent(context, ChatMainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK;
        context.startActivity(intent)
    }
}