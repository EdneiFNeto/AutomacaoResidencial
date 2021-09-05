package com.medidordeenergia.async

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class BaseAsyncTask<T>(
    private val executando: () -> T,
    private val finalizado: (resultado: T?) -> Unit
) {

    private var t: T? = null
    private var scope: CoroutineScope = CoroutineScope(Dispatchers.IO)

    fun execute() {
        scope.launch {
            t = executando()
            withContext(Dispatchers.Main) {
                finalizado(t)
            }
        }
    }
}