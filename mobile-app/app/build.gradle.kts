plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    // Add the Google services Gradle plugin
    id("com.google.gms.google-services")
    id("com.apollographql.apollo") version "4.1.1"
}


android {
    namespace = "com.sport.zagreb"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.sport.zagreb"
        minSdk = 33
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.work.runtime.ktx)
    implementation(libs.firebase.messaging.ktx)
    implementation(libs.androidx.media3.common.ktx)
    implementation(libs.firebase.messaging)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
    // Import the Firebase BoM
    implementation(platform(libs.firebase.bom))
    implementation(libs.firebase.analytics)
    implementation(libs.core.splashscreen)
    // Coil
    implementation(libs.coil.compose)

// Swipe to refresh
    implementation(libs.androidx.material) // za SwipeRefresh (ako koristiš Material3 može i novi material3-pullrefresh)
    implementation(libs.material3) // ako želiš full Material 3
    // Za PullRefresh
    implementation(libs.androidx.material3.v120)
    implementation ("com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar")
    implementation (libs.aws.android.sdk.s3)
    implementation (libs.aws.android.sdk.cognito)
    implementation (libs.aws.android.sdk.core)
    implementation(libs.apollo.runtime)
    implementation(libs.ui) // ili koju već koristiš
    implementation(libs.material3)
    implementation(libs.coil.compose) // OVO TI TREBA ZA SLIKE
    implementation(libs.androidx.navigation.compose)
    implementation(libs.okhttp)
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.openai.client)
}

apollo {
    service("service") {
        packageName.set("com.sport.zagreb")
        schemaFile.set(file("src/main/graphql/com/sport/zagreb/schema.graphqls"))
        introspection {
            endpointUrl.set("https://api.zagrebsport.com/v1/graphql")
            headers.set(
                mapOf("x-hasura-admin-secret" to "pwd_hasura")
            )
        }
    }
}