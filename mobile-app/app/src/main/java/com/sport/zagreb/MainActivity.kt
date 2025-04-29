package com.sport.zagreb

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.sport.zagreb.ui.theme.ZagrebSPORTTheme
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import android.Manifest
import android.os.Build
import android.os.Bundle
import android.view.animation.OvershootInterpolator
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.OptIn
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import androidx.media3.common.util.Log
import androidx.media3.common.util.UnstableApi
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.google.firebase.messaging.FirebaseMessaging
import com.sport.zagreb.ui.HomeScreen
import com.sport.zagreb.ui.LoginScreen
import com.sport.zagreb.ui.SavezScreen

class MainActivity : ComponentActivity() {
    @OptIn(UnstableApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val splashScreen = installSplashScreen()

        splashScreen.setOnExitAnimationListener { splashScreenViewProvider ->
            val splashView = splashScreenViewProvider.view
            splashView.animate()
                .scaleX(1.1f)
                .scaleY(1.1f)
                .alpha(0f)
                .setDuration(400)
                .setInterpolator(OvershootInterpolator())
                .withEndAction { splashScreenViewProvider.remove() }
                .start()
        }

        var keepSplashScreen = true
        splashScreen.setKeepOnScreenCondition { keepSplashScreen }
        lifecycleScope.launch {
            delay(1000)
            keepSplashScreen = false
        }

        FirebaseMessaging.getInstance().token
            .addOnCompleteListener { task ->
                if (!task.isSuccessful) {
                    Log.w("SportZGMessagingService", "Fetching FCM registration token failed", task.exception)
                    return@addOnCompleteListener
                }
                val token = task.result
                Log.d("SportZGMessagingService", "FCM Token manually fetched: $token")

                FirebaseMessaging.getInstance().subscribeToTopic("everyone")
                    .addOnCompleteListener { subscribeTask ->
                        if (subscribeTask.isSuccessful) {
                            Log.d("SportZGMessagingService", "Successfully subscribed to topic 'everyone'")
                        } else {
                            Log.w("SportZGMessagingService", "Failed to subscribe to topic 'everyone'", subscribeTask.exception)
                        }
                    }
            }

        enableEdgeToEdge()

        setContent {
            ZagrebSPORTTheme {
                val navController = rememberNavController()

                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = "home" ,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable("greeting") {
                            Column(
                                modifier = Modifier.fillMaxSize(),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.Center
                            ) {
                                Greeting(name = "Android")
                                Spacer(modifier = Modifier.height(24.dp))
                                Button(onClick = {   }) {
                                    Text("Go to Login")
                                }
                            }
                        }
                        composable("home") {
                            HomeScreen(navController)
                        }
                        composable("savez") {
                            SavezScreen()
                        }
                        composable("login") {
                            LoginScreen()
                        }
                    }
                }
            }
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
            != android.content.pm.PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.POST_NOTIFICATIONS), 1001)
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    ZagrebSPORTTheme {
        Greeting("Android")
    }
}