package com.medidordeenergia

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.medidordeenergia.async.BaseAsyncTask
import com.medidordeenergia.helpers.ConnectionHelpers

private const val TAG = "MainLog"

class MainActivity : AppCompatActivity() {
    private lateinit var resultText: String
    private lateinit var button: Button
    private lateinit var imageView: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onResume() {
        super.onResume()
        button = findViewById(R.id.button)
        imageView = findViewById(R.id.imageView)

        readerHtml("")
        setupEventListener()
    }

    private fun setupEventListener() {
        button.apply {
            setOnClickListener {
                when (getStatusLed()) {
                    "Desligado" -> readerHtml("/ledon?")
                    else -> readerHtml("/ledof?")
                }
            }
        }
    }

    private fun readerHtml(parameter: String?) {
        BaseAsyncTask(executando = {
            val connection =
                ConnectionHelpers.connection("http://192.168.1.66${parameter}")
            connection.toString()
        }, finalizado = {
            Log.e(TAG, it.toString())
            if (it != null){
                resultText = it.toString()
                button.text = getStatusLed()
                imageView.setImageResource(if(getStatusLed() == "Ligado") R.drawable.high else R.drawable.low)
            }
        }).execute()
    }

    private fun getStatusLed(): String? {
        if (::resultText.isInitialized) {
            return if (resultText.contains("LED DESLIGADO")) {
                "Desligado"
            } else {
                "Ligado"
            }
        }

        return null
    }
}