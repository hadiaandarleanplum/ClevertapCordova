/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
//document.addEventListener('deviceready', this.onDeviceReady, false);
document.addEventListener('onCleverTapProfileSync', this.onCleverTapProfileSync, false); // optional: to be notified of CleverTap user profile synchronization updates
document.addEventListener('onCleverTapProfileDidInitialize', this.onCleverTapProfileDidInitialize, false); // optional, to be notified when the CleverTap user profile is initialized
document.addEventListener('onCleverTapInAppNotificationDismissed', this.onCleverTapInAppNotificationDismissed, false); // optional, to be receive a callback with custom in-app notification click data
document.addEventListener('onDeepLink', this.onDeepLink, false); // optional, register to receive deep links.
document.addEventListener('onPushNotification', this.onPushNotification, false); // optional, register to receive push notification payloads.
document.addEventListener('onCleverTapInboxDidInitialize', this.onCleverTapInboxDidInitialize, false); // optional, to check if CleverTap Inbox intialized
document.addEventListener('onCleverTapInboxMessagesDidUpdate', this.onCleverTapInboxMessagesDidUpdate, false); // optional, to check if CleverTap Inbox Messages were updated
document.addEventListener('onCleverTapInboxButtonClick', this.onCleverTapInboxButtonClick, false); // optional, to check if Inbox button was clicked with custom payload
document.addEventListener('onCleverTapInAppButtonClick', this.onCleverTapInAppButtonClick, false); // optional, to check if InApp button was clicked with custom payload
document.addEventListener('onCleverTapFeatureFlagsDidUpdate', this.onCleverTapFeatureFlagsDidUpdate, false); // optional, to check if Feature Flags were updated
document.addEventListener('onCleverTapProductConfigDidInitialize', this.onCleverTapProductConfigDidInitialize, false); // optional, to check if Product Config was initialized
document.addEventListener('onCleverTapProductConfigDidFetch', this.onCleverTapProductConfigDidFetch, false); // optional, to check if Product Configs were updated
document.addEventListener('onCleverTapProductConfigDidActivate', this.onCleverTapProductConfigDidActivate, false); // optional, to check if Product Configs were activated
document.addEventListener('onCleverTapDisplayUnitsLoaded', this.onCleverTapDisplayUnitsLoaded, false); // optional, to check if Native Display units were loaded

CleverTap.setDebugLevel(3);

// deep link handling  
onDeepLink: function(e) {
    console.log(e.deeplink);  
},

// push notification data handling
onPushNotification: function(e) {
    console.log(JSON.stringify(e.notification));
},

onCleverTapInboxDidInitialize: function() {
    CleverTap.showInbox({"navBarTitle":"My App Inbox","tabs": ["tag1", "tag2"],"navBarColor":"#FF0000"});
},
    
onCleverTapInboxMessagesDidUpdate: function() {
    CleverTap.getInboxMessageUnreadCount(function(val) {console.log("Inbox unread message count"+val);})
    CleverTap.getInboxMessageCount(function(val) {console.log("Inbox read message count"+val);});
},

onCleverTapInAppButtonClick: function(e) {
    console.log("onCleverTapInAppButtonClick");
    console.log(e.customExtras);
},

onCleverTapInboxButtonClick: function(e) {
    console.log("onCleverTapInboxButtonClick");
    console.log(e.customExtras);
},

onCleverTapFeatureFlagsDidUpdate: function() {
    console.log("onCleverTapFeatureFlagsDidUpdate");
},

onCleverTapProductConfigDidInitialize: function() {
    console.log("onCleverTapProductConfigDidInitialize");
},

onCleverTapProductConfigDidFetch: function() {
    console.log("onCleverTapProductConfigDidFetch");
},

onCleverTapProductConfigDidActivate: function() {
    console.log("onCleverTapProductConfigDidActivate");
},

onCleverTapDisplayUnitsLoaded: function(e) {
    console.log("onCleverTapDisplayUnitsLoaded");
    console.log(e.units);
},



function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    console.log('HELLO DOES THIS WORK');

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        CleverTap.notifyDeviceReady();

        //onUserLogin
        var stuff = ["bags", "shoes"];
        var profile = {
            'Name': 'Captain America',
            'Identity': '100',
            'Email': 'captain@america.com',
            'Phone': '+14155551234',
            'stuff': stuff
        }
        CleverTap.onUserLogin(profile);

        //Record event w/data
        var eventData = {
        // Key:    Value
        'first': 'partridge',
        'second': 'turtledoves'
        }
        CleverTap.recordEventWithName('Cordova Event', eventData);
    },
}



