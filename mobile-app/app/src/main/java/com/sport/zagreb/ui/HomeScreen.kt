package com.sport.zagreb.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.navigation.NavController
import com.apollographql.apollo.ApolloClient
import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import com.sport.zagreb.R // bitno da imaš ovo za pristup drawable resursima
import com.sport.zagreb.DohvatiMiSveQuery
import com.sport.zagreb.type.Json
import kotlinx.coroutines.launch
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull


@Composable
fun HomeScreen(navController: NavController) {
    val locations = listOf(
        Location(
            name = "Jarun",
            description = "Sportski centar i rekreacija",
            imageRes = R.drawable.jarun // ➔ moraš staviti jarun.jpg u res/drawable
        ),
        Location(
            name = "Bundek",
            description = "Jezerce i šetalište",
            imageRes = R.drawable.bundek
        ),
        Location(
            name = "Maksimir",
            description = "Park i stadion",
            imageRes = R.drawable.maksimir
        )
    )

    val savezi = listOf(
        Location(
            name = "ZICER",
            description = "Zagrebacki inovacijski centar",
            imageRes = R.drawable.zicer_logo // ➔ moraš staviti jarun.jpg u res/drawable
        ),
        Location(
            name = "Veslacki savez",
            description = "Trofejni veslacki klubovi grada Zagreba",
            imageRes = R.drawable.veslacki_logo
        ),
        Location(
            name = "Atletski savez",
            description = "Savez svih atletskih klubova grada Zagreba",
            imageRes = R.drawable.atletski_logo
        ),
        Location(
            name = "Sportski savez",
            description = "Sportski savez grada Zagreba",
            imageRes = R.drawable.sportski_savez_grada_zg
        ),
        Location(
            name = "Taekwondo savez",
            description = "Taekwondo savez grada Zagreba",
            imageRes = R.drawable.taekwondo
        )
    )

    val sports = listOf(
        Sport(name = "Tenis", imageRes = R.drawable.tenis),
        Sport(name = "Nogomet", imageRes = R.drawable.nogomet),
        Sport(name = "Košarka", imageRes = R.drawable.kosarka),
        Sport(name = "Rukomet", imageRes = R.drawable.rukomet),
        Sport(name = "Plivanje", imageRes = R.drawable.plivanje),
        Sport(name = "Veslanje", imageRes = R.drawable.veslanje),
        Sport(name = "Atletika", imageRes = R.drawable.ic_notif_runner),
        Sport(name = "Taekwondo", imageRes = R.drawable.taekwondo2)
    )

    var showDialog by remember { mutableStateOf(false) }
    var searchText by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var question by remember { mutableStateOf("") }
    var answer by remember { mutableStateOf("") }
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(8.dp)
    ) {
        // Profil gumb gore desno
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.weight(1f)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.mali_zagi),
                    contentDescription = "Logo",
                    modifier = Modifier
                        .size(80.dp)
                        .padding(end = 8.dp)
                )
                Text(
                    text = "Sport Zagreb",
                    style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.primary
                )
            }
            IconButton(
                onClick = {
                    navController.navigate("login")
                }
            ) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = "Login",
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(40.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Okrugle ikone sa oznakama sporta
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(sports) { sport ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Surface(
                        shape = CircleShape,
                        color = Color.Blue,
                        modifier = Modifier.size(60.dp)
                    ) {
                        Box(contentAlignment = Alignment.Center) {
                            Image(
                                painter = painterResource(id = sport.imageRes),
                                contentDescription = sport.name,
                                modifier = Modifier
                                    .padding(8.dp)
                                    .clip(CircleShape)
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = sport.name,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Preporučamo za vas",
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(horizontal = 8.dp)
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Horizontalni scroll cardova sa lokalnim slikama
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(locations) { location ->
                Card(
                    onClick = { /* TODO: Open location details */ },
                    modifier = Modifier
                        .width(180.dp)
                        .height(240.dp)
                ) {
                    Column {
                        Image(
                            painter = painterResource(id = location.imageRes),
                            contentDescription = location.name,
                            modifier = Modifier
                                .height(140.dp)
                                .fillMaxWidth()
                                .clip(MaterialTheme.shapes.medium)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = location.name,
                            style = MaterialTheme.typography.titleMedium,
                            modifier = Modifier.padding(horizontal = 8.dp)
                        )
                        Text(
                            text = location.description,
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

// Search bar + Pitaj button
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            OutlinedTextField(
                value = searchText,
                onValueChange = { searchText = it },
                placeholder = { Text("Pitaj me...") },
                modifier = Modifier
                    .weight(1f)
                    .padding(end = 8.dp),
                singleLine = true,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = MaterialTheme.colorScheme.primary,
                    unfocusedBorderColor = MaterialTheme.colorScheme.outline
                )
            )

            Button(
                onClick = {
                    scope.launch {
                        isLoading = true

                        val result = fetchDohvatiMiSve()
                        result.fold(
                            onSuccess = { data ->
                                val korisnickoPitanje = searchText

                                // Pripremaš podatke za ChatGPT
                                val feedItems = data.feed?.joinToString("\n") { feedItem ->
                                    "- ${feedItem.subject} (${feedItem.description})"
                                } ?: "Nema podataka"

                                val formattedPrompt = """
                                Upute:
                                - Odgovori jasno i kratko.
                                - Ako nemaš podatke, reci da nisu dostupni.
                                - Odgovaraj prijateljskim tonom.
                                - ti si sportski influencer, zelis ljude na sportu
                                Korisničko pitanje: $korisnickoPitanje
                                Podaci:
                                $feedItems
                            """.trimIndent()

                                // Sada šaljemo to ChatGPT-u
                                val gptOdgovor = sendToChatGPT(formattedPrompt)

                                question = korisnickoPitanje
                                answer = gptOdgovor
                                showDialog = true
                            },
                            onFailure = {
                                question = "Greška"
                                answer = it.localizedMessage ?: "Nepoznata greška"
                                showDialog = true
                            }
                        )

                        isLoading = false
                    }
                }
            ) {
                Text(text = if (isLoading) "Čekaj..." else "Pitaj")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // LazyColumn sa slikom i tekstom
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxSize()
        ) {
            itemsIndexed(savezi) { index,location ->
                Card(
                    onClick = {  if (index == 0) { // klik na prvi (ZICER)
                        navController.navigate("savez")
                    } },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(80.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .padding(8.dp)
                    ) {
                        Image(
                            painter = painterResource(id = location.imageRes),
                            contentDescription = location.name,
                            modifier = Modifier
                                .size(64.dp)
                                .clip(CircleShape)
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(
                                text = location.name,
                                style = MaterialTheme.typography.titleMedium
                            )
                            Text(
                                text = location.description,
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }
                }
            }
        }

        if (showDialog) {
            Dialog(
                onDismissRequest = { showDialog = false }
            ) {
                Surface(
                    shape = MaterialTheme.shapes.medium,
                    tonalElevation = 8.dp,
                    modifier = Modifier
                        .fillMaxWidth()
                        .fillMaxHeight(0.9f) // 90% visine ekrana
                ) {
                    Column(
                        modifier = Modifier.fillMaxSize()
                    ) {
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .fillMaxWidth()
                                .background(Color.Black)
                                .padding(24.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = question,
                                color = Color.White,
                                style = MaterialTheme.typography.titleMedium, // ⬅️ malo manji font
                                textAlign = androidx.compose.ui.text.style.TextAlign.Center
                            )
                        }
                        Box(
                            modifier = Modifier
                                .weight(2f) // ⬅️ povećao malo prostor za odgovor
                                .fillMaxWidth()
                                .background(Color.White)
                                .padding(24.dp)
                        ) {
                            // SCROLL
                            androidx.compose.foundation.rememberScrollState().let { scrollState ->
                                Column(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .verticalScroll(scrollState),
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.Top
                                ) {
                                    Text(
                                        text = answer,
                                        color = Color.Black,
                                        style = MaterialTheme.typography.bodyMedium, // ⬅️ malo manji font
                                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                                    )
                                }
                            }
                        }
                        Button(
                            onClick = { showDialog = false },
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp)
                        ) {
                            Text(text = "Zatvori")
                        }
                    }
                }
            }
        }
    }
}

suspend fun fetchDohvatiMiSve(): Result<DohvatiMiSveQuery.Data> {
    return try {
        val apolloClient = ApolloClient.Builder()
            .serverUrl("https://api.zagrebsport.com/v1/graphql")
            .addHttpHeader("x-hasura-admin-secret", "pwd_hasura")
            .build()

        val response = apolloClient.query(DohvatiMiSveQuery()).execute()

        if (response.hasErrors()) {
            Result.failure(Exception(response.errors?.firstOrNull()?.message ?: "Nepoznata greška"))
        } else {
            Result.success(response.data!!)
        }
    } catch (e: Exception) {
        Result.failure(e)
    }
}

suspend fun sendToChatGPT(prompt: String): String {
    val client = OkHttpClient()

    val apiKey = "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" // ⬅️ zamijeni ovdje svojim ključem

    // Napravi JSON tijelo za OpenAI API
    val message = JsonObject().apply {
        addProperty("role", "user")
        addProperty("content", prompt)
    }

    val messagesArray = JsonArray().apply {
        add(message)
    }

    val requestBodyJson = JsonObject().apply {
        addProperty("model", "gpt-3.5-turbo")
        add("messages", messagesArray)
    }

    val mediaType = "application/json".toMediaTypeOrNull()
    val body = RequestBody.create(mediaType, requestBodyJson.toString())

    val request = Request.Builder()
        .url("https://api.openai.com/v1/chat/completions")
        .header("Authorization", "Bearer $apiKey")
        .post(body)
        .build()

    return withContext(Dispatchers.IO) {
        val response = client.newCall(request).execute()
        if (response.isSuccessful) {
            val bodyString = response.body?.string() ?: ""

            // Parse JSON koristeći Gson
            val gson = com.google.gson.Gson()
            val root = gson.fromJson(bodyString, com.google.gson.JsonObject::class.java)

            val content = root
                .getAsJsonArray("choices")
                .get(0).asJsonObject
                .getAsJsonObject("message")
                .get("content").asString

            content
        } else {
            "Greška: ${response.code}"
        }
    }
}
// Data klasa za lokacije
data class Location(
    val name: String,
    val description: String,
    val imageRes: Int
)

data class Sport(
    val name: String,
    val imageRes: Int
)