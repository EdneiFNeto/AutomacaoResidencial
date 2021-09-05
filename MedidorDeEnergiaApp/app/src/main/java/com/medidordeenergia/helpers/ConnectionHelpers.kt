package com.medidordeenergia.helpers

import android.util.Log
import java.io.BufferedInputStream
import java.io.BufferedReader
import java.io.InputStreamReader
import java.lang.Exception
import java.lang.StringBuilder
import java.net.HttpURLConnection
import java.net.URL


private const val TAG = "ConnectionHelLog"

class ConnectionHelpers {

    companion object {
        private lateinit var inputStream: BufferedInputStream
        private lateinit var httpURLConnection: HttpURLConnection

        fun connection(usrStr: String): String? {
            try {
                val url = URL(usrStr)
                httpURLConnection = url.openConnection() as HttpURLConnection

                if (httpURLConnection.responseCode == 200) {
                    Log.e(TAG, "Url ${httpURLConnection.url}")
                    Log.e(TAG, "Content ${httpURLConnection.content}")
                    inputStream = BufferedInputStream(httpURLConnection.inputStream)
                    val reader = BufferedReader(InputStreamReader(inputStream, "UTF-8"))

                    var stringResult = StringBuilder()
                    var iterator = reader.lineSequence().iterator()
                    while (iterator.hasNext()) {
                        stringResult.append(iterator.next()).append("\n")
                    }

                    return  stringResult.toString()
                }
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                inputStream.close()
                httpURLConnection.disconnect()
            }

            return null
        }
    }
}