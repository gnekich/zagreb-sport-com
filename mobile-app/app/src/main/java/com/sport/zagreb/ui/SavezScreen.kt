package com.sport.zagreb.ui

import android.content.Context
import android.net.Uri
import android.os.Environment
import android.util.Log
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.outlined.FavoriteBorder
import androidx.compose.material.pullrefresh.PullRefreshIndicator
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material.pullrefresh.rememberPullRefreshState
import androidx.compose.material3.*
import androidx.compose.material3.CardDefaults.cardColors
import androidx.compose.material3.CardDefaults.cardElevation
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.mobileconnectors.s3.transferutility.TransferListener
import com.amazonaws.mobileconnectors.s3.transferutility.TransferState
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility
import com.amazonaws.services.s3.AmazonS3Client
import com.apollographql.apollo.ApolloClient
import com.sport.zagreb.GetFeedQuery
import com.sport.zagreb.GetImgFeedQuery
import com.sport.zagreb.R
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.layout.positionInRoot
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.DpOffset
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.staggeredgrid.LazyVerticalStaggeredGrid
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridCells
import androidx.compose.foundation.lazy.staggeredgrid.items


@OptIn(ExperimentalMaterial3Api::class, ExperimentalMaterialApi::class)
@Composable
fun SavezScreen() {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    var expanded by remember { mutableStateOf(false) }
    var photoUri by remember { mutableStateOf<Uri?>(null) }
    var photoFile by remember { mutableStateOf<File?>(null) }

    var feedItems by remember { mutableStateOf<List<GetFeedQuery.Feed>>(emptyList()) }
    var isLoadingFeed by remember { mutableStateOf(true) }
    var feedError by remember { mutableStateOf<String?>(null) }
    var isRefreshing by remember { mutableStateOf(false) }

    var imgFeedItems by remember { mutableStateOf<List<String>>(emptyList()) }
    var isLoadingImgFeed by remember { mutableStateOf(true) }
    var imgFeedError by remember { mutableStateOf<String?>(null) }
    var fabOffset by remember { mutableStateOf(Offset.Zero) }

    val cameraPermissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (!isGranted) {
            Toast.makeText(context, "Permission denied", Toast.LENGTH_SHORT).show()
        }
    }

    val takePictureLauncher = rememberLauncherForActivityResult(ActivityResultContracts.TakePicture()) { success ->
        if (success) {
            photoFile?.let { uploadFileToS3(context, it) }
        } else {
            Toast.makeText(context, "Nije uspjelo slikanje", Toast.LENGTH_SHORT).show()
        }
    }

    val pullRefreshState = rememberPullRefreshState(
        refreshing = isRefreshing,
        onRefresh = {
            scope.launch {
                isRefreshing = true
                val feedResult = runCatching { refreshFeedSimple() }
                val imgResult = fetchImgFeed()

                feedResult.fold(
                    onSuccess = { feedItems = it },
                    onFailure = { feedError = it.localizedMessage ?: "Greška" }
                )

                imgResult.fold(
                    onSuccess = { imgFeedItems = it },
                    onFailure = { imgFeedError = it.localizedMessage ?: "Greška kod slika" }
                )

                isRefreshing = false
            }
        }
    )

    LaunchedEffect(Unit) {
        fetchImgFeed().fold(
            onSuccess = {
                imgFeedItems = it
                isLoadingImgFeed = false
            },
            onFailure = {
                imgFeedError = it.localizedMessage ?: "Greška kod slika"
                isLoadingImgFeed = false
            }
        )
    }

    LaunchedEffect(Unit) {
        refreshFeed(
            onLoading = { isLoadingFeed = true },
            onResult = { result ->
                isLoadingFeed = false
                result.fold(
                    onSuccess = {
                        feedItems = it
                        feedError = null
                    },
                    onFailure = {
                        feedError = it.localizedMessage ?: "Greška"
                    }
                )
            }
        )
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .pullRefresh(pullRefreshState)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
        ) {
            HeaderSection()

            LazyRow(
                modifier = Modifier.padding(start = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                items(1) {
                    CategoryItem()
                }
            }

            Spacer(modifier = Modifier.height(8.dp))


            LazyVerticalStaggeredGrid(
                columns = StaggeredGridCells.Fixed(2),
                contentPadding = PaddingValues(8.dp),
                verticalItemSpacing = 8.dp,
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxSize()
            ) {
//                items(3) { index ->
//                    if (index % 3 == 0) {
//                        TextOnlyPostItem(index)
//                    } else {
//                        ImagePostItem(index)
//                    }
//                }

                // Feed items
                if (isLoadingFeed) {
                    item {
                        CircularProgressIndicator(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp)
                                .wrapContentWidth(Alignment.CenterHorizontally)
                        )
                    }
                } else if (feedError != null) {
                    item {
                        Text(
                            text = feedError ?: "Greška",
                            color = Color.Red,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            textAlign = TextAlign.Center
                        )
                    }
                } else {
                    items(feedItems) { feedItem ->
                        FeedItem(feedItem)
                    }
                }

                // Feed slike
                if (isLoadingImgFeed) {
                    item {
                        CircularProgressIndicator(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp)
                                .wrapContentWidth(Alignment.CenterHorizontally)
                        )
                    }
                } else if (imgFeedError != null) {
                    item {
                        Text(
                            text = imgFeedError ?: "Greška kod slika",
                            color = Color.Red,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            textAlign = TextAlign.Center
                        )
                    }
                } else {
                    items(imgFeedItems) { imgUrl ->
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 8.dp),
                            colors = cardColors(containerColor = Color(0xFFF5F5F5)),
                            elevation = cardElevation(defaultElevation = 4.dp)
                        ) {
                            AsyncImage(
                                model = imgUrl,
                                contentDescription = "Feed slika",
                                contentScale = ContentScale.Crop,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(240.dp)
                            )
                        }
                    }
                }
            }
        }

        PullRefreshIndicator(
            refreshing = isRefreshing,
            state = pullRefreshState,
            modifier = Modifier.align(Alignment.TopCenter)
        )

        FloatingActionButton(
            onClick = { expanded = !expanded },
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp)
                .onGloballyPositioned { coordinates ->
                    fabOffset = Offset(
                        coordinates.positionInRoot().x,
                        coordinates.positionInRoot().y
                    )
                }
        ) {
            Icon(Icons.Filled.Add, contentDescription = "Dodaj")
        }


        val density = LocalDensity.current

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            offset = with(density) {
                DpOffset(
                    fabOffset.x.toDp() - 60.dp,  // pomaknemo ga malo ulijevo
                    fabOffset.y.toDp() - 60.dp  // i gore
                )
            }
        ) {
            DropdownMenuItem(
                text = { Text("Dodaj sliku") },
                onClick = {
                    expanded = false
                    val (uri, file) = createImageFile(context, ocr = false)
                    photoUri = uri
                    photoFile = file
                    takePictureLauncher.launch(uri)
                }
            )
            DropdownMenuItem(
                text = { Text("Dodaj rezultate") },
                onClick = {
                    expanded = false
                    val (uri, file) = createImageFile(context, ocr = true)
                    photoUri = uri
                    photoFile = file
                    takePictureLauncher.launch(uri)
                }
            )
        }
    }
}

@Composable
private fun HeaderSection() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Image(
            painter = painterResource(id = R.drawable.zicer_logo),
            contentDescription = "logo",
            modifier = Modifier
                .size(64.dp)
                .clip(MaterialTheme.shapes.medium)
                .border(2.dp, Color.Gray, MaterialTheme.shapes.medium)
                .background(Color.DarkGray),
            contentScale = ContentScale.Crop
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column {
            Text(
                text = "ZICER",
                style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
            )
            Text(
                text = "Zagrebacki inovacijski centar",
                style = MaterialTheme.typography.bodyMedium.copy(color = Color.Gray)
            )
        }
    }
}

@Composable
private fun CategoryItem() {
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .padding(horizontal = 2.dp, vertical = 4.dp)
    ) {
        Image(
            painter = painterResource(id = R.drawable.hackl_logo_2),
            contentDescription = "Kategorija",
            modifier = Modifier
                .size(48.dp)
                .clip(MaterialTheme.shapes.medium)
                .background(Color.DarkGray),
            contentScale = ContentScale.Crop
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = "HACKL Sport na volej",
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier
                .widthIn(max = 60.dp)
                .align(Alignment.CenterHorizontally),
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun FeedItem(item: GetFeedQuery.Feed) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp),
        colors = cardColors(containerColor = Color(0xFFF5F5F5)),
        elevation = cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = item.subject ?: "Bez naslova",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = item.description ?: "Bez opisa",
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}

private suspend fun refreshFeed(
    onLoading: () -> Unit,
    onResult: (Result<List<GetFeedQuery.Feed>>) -> Unit
) {
    onLoading()
    try {
        val apolloClient = ApolloClient.Builder()
            .serverUrl("https://api.zagrebsport.com/v1/graphql")
            .addHttpHeader("x-hasura-admin-secret", "pwd_hasura")
            .build()

        val response = apolloClient.query(GetFeedQuery()).execute()

        if (response.hasErrors()) {
            onResult(Result.failure(Exception(response.errors?.firstOrNull()?.message)))
        } else {
            onResult(Result.success(response.data?.feed.orEmpty()))
        }
    } catch (e: Exception) {
        onResult(Result.failure(e))
    }
}

@Composable
fun ImagePostItem(index: Int) {
    val scale = remember { Animatable(0.8f) }
    val alpha = remember { Animatable(0f) }
    var liked by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        scale.animateTo(1f, tween(durationMillis = 500, easing = FastOutSlowInEasing))
        alpha.animateTo(1f, tween(durationMillis = 500))
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .graphicsLayer {
                scaleX = scale.value
                scaleY = scale.value
                this.alpha = alpha.value
            },
        elevation = cardElevation(defaultElevation = 8.dp),
        shape = MaterialTheme.shapes.medium,
        colors = cardColors(containerColor = Color(0xFFF5F5F5))
    ) {
        Column(
            modifier = Modifier.padding(12.dp)
        ) {
            Text(
                text = "Naslov slike $index",
                style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(12.dp))
            AsyncImage(
                model = "https://picsum.photos/400/400?random=$index",
                contentDescription = "Slika $index",
                modifier = Modifier
                    .fillMaxWidth()
                    .height(240.dp),
                //.clip(MaterialTheme.shapes.medium),
                contentScale = ContentScale.Crop
            )
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "Ovo je opis slike $index...",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(12.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                Icon(
                    imageVector = if (liked) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                    contentDescription = "Like",
                    tint = if (liked) Color.Red else Color.Gray,
                    modifier = Modifier
                        .size(32.dp)
                        .clickable { liked = !liked }
                )
            }
        }
    }
}


@Composable
fun TextOnlyPostItem(index: Int) {
    val scale = remember { Animatable(0.8f) }
    val alpha = remember { Animatable(0f) }
    var liked by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        scale.animateTo(1f, tween(durationMillis = 500, easing = FastOutSlowInEasing))
        alpha.animateTo(1f, tween(durationMillis = 500))
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .graphicsLayer {
                scaleX = scale.value
                scaleY = scale.value
                this.alpha = alpha.value
            },
        elevation = cardElevation(defaultElevation = 8.dp),
        shape = MaterialTheme.shapes.medium,
        colors = cardColors(containerColor = Color(0xFFF5F5F5))
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Naslov objave $index",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Ovo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava brojOvo je samo tekstualna objava broj $index...",
                style = MaterialTheme.typography.bodyMedium
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                Icon(
                    imageVector = if (liked) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                    contentDescription = "Like",
                    tint = if (liked) Color.Red else Color.Gray,
                    modifier = Modifier
                        .size(28.dp)
                        .clickable { liked = !liked }
                )
            }
        }
    }
}

// Helper funkcije
private fun createImageFile(context: Context, ocr: Boolean = false): Pair<Uri, File> {
    val timeStamp: String = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
    val prefix = if (ocr) "" else "n-"
    val fileName = "${prefix}JPEG_${timeStamp}_"
    val storageDir: File? = context.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
    val file = File.createTempFile(fileName, ".jpg", storageDir)
    val uri = androidx.core.content.FileProvider.getUriForFile(context, "${context.packageName}.provider", file)
    return uri to file
}

private fun uploadFileToS3(context: Context, file: File) {
    val credentials = BasicAWSCredentials("ACCESS_KEY", "SECRET_KEY")
    val s3Client = AmazonS3Client(credentials)

    val transferUtility = TransferUtility.builder()
        .context(context)
        .s3Client(s3Client)
        .build()

    transferUtility.upload(
        "zagrebsport-data-f1337f33a1",
        "uploads/${file.name}",   // koristi file.name direktno
        file
    ).setTransferListener(object : TransferListener {
        override fun onStateChanged(id: Int, state: TransferState?) {
            if (state == TransferState.COMPLETED) {
                Toast.makeText(context, "Upload completed!", Toast.LENGTH_SHORT).show()
            }
        }

        override fun onProgressChanged(id: Int, bytesCurrent: Long, bytesTotal: Long) {
            val percentDone = (bytesCurrent.toDouble() / bytesTotal.toDouble() * 100).toInt()
            Log.d("AWS", "Progress: $percentDone%")
        }

        override fun onError(id: Int, ex: Exception?) {
            Log.e("AWS", "Error during upload", ex)
        }
    })
}

private suspend fun fetchImgFeed(): Result<List<String>> {
    return try {
        val apolloClient = ApolloClient.Builder()
            .serverUrl("https://api.zagrebsport.com/v1/graphql")
            .addHttpHeader("x-hasura-admin-secret", "PWD_HASURA")
            .build()

        val response = apolloClient.query(GetImgFeedQuery()).execute()

        if (response.hasErrors()) {
            Result.failure(Exception(response.errors?.firstOrNull()?.message ?: "Unknown error"))
        } else {
            val urls = response.data?.feed?.mapNotNull { it.slika_url } ?: emptyList()
            Result.success(urls)
        }
    } catch (e: Exception) {
        Result.failure(e)
    }
}

private suspend fun refreshFeedSimple(): List<GetFeedQuery.Feed> {
    val apolloClient = ApolloClient.Builder()
        .serverUrl("https://api.zagrebsport.com/v1/graphql")
        .addHttpHeader("x-hasura-admin-secret", "Pwd_hasura")
        .build()

    val response = apolloClient.query(GetFeedQuery()).execute()

    if (response.hasErrors()) {
        throw Exception(response.errors?.firstOrNull()?.message)
    }

    return response.data?.feed.orEmpty()
}