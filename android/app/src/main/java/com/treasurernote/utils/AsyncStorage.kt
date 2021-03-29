package com.treasurernote.utils

import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.storage.ReactDatabaseSupplier
import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.reflect.TypeToken
import com.treasurernote.chats.data.model.ContactMemberItem
import org.json.JSONObject
import java.lang.reflect.Type


class AsyncStorage(var context: ReactApplicationContext) {
//    var keyData: JSONObject? = null
    private var catalystLocalStorage: Cursor? = null
    var readableDatabase: SQLiteDatabase? = null

    fun fetchKey(searchKey: String,searchData: String) : MutableList<ContactMemberItem> {
        var memberList = mutableListOf<ContactMemberItem>()
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).readableDatabase
            catalystLocalStorage = readableDatabase?.query("catalystLocalStorage", null, null, null, null, null, null)
            if (catalystLocalStorage?.moveToFirst()!!) {
                do {
                    try {
                        val key = catalystLocalStorage?.getString(0)
                        val json = catalystLocalStorage?.getString(1)
                        if ("persist:root" == key) {
                            val jsonObj = JSONObject(json).getString(searchKey)
                            val obj = JSONObject(jsonObj)
                            val keyData = obj.getJSONArray(searchData)
                            Log.d(TAG, "fetchKey: @aditya keydata"+keyData)

                            for (i in 0 until keyData.length()){
                                val data = keyData.getJSONObject(i).getJSONArray("data")
                                for (i in 0 until data.length()){
                                    val id = data.getJSONObject(i).optString("id").toString()
                                    val profileName = data.getJSONObject(i).optString("userName").toString()
                                    val phone = data.getJSONObject(i).optString("phone").toString()
                                    val email = data.getJSONObject(i).optString("email").toString()
                                    val image = data.getJSONObject(i).optString("image").toString()
                                    val egf = data.getJSONObject(i).optString("egf").toString()

                                    val contactMemberItem = ContactMemberItem(profileName,image,phone,email,egf,id=id)
                                    memberList.add(contactMemberItem)
                                }
                            }

//                            val gson = Gson()
//                            val type: Type = object : TypeToken<List<ContactMemberItem?>?>() {}.type
//                            val contactList: List<ContactMemberItem> = gson.fromJson(keyData, type)

                        }
                    } catch (e: Exception) {
                        Log.e(TAG, "fetchKey: Error retrieving data",e )
                    }
                } while (catalystLocalStorage?.moveToNext()!!)
            }
        } finally {
            if (catalystLocalStorage != null) {
                catalystLocalStorage?.close()
            }
            if (readableDatabase != null) {
                readableDatabase?.close()
            }
            return memberList
        }
    }

    companion object {
        private const val TAG = "RNAsyncStorage"
    }

//    fun getToken(): String? {
//        return try {
//            this.userData?.getJSONObject("data")?.getString("X-Ved-Token")
//        } catch (e: Exception) {
//            Log.e("VED_USER_TOKEN", "Error when reading from token from userData", e)
//            ""
//        }
//    }

//    init {
//        fetch()
//    }
}