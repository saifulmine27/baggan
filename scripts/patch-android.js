// AndroidManifest-এ নোটিফিকেশনের অনুমতি যোগ করে
const fs = require('fs');
const p = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(p, 'utf8');
const perms = [
  'android.permission.POST_NOTIFICATIONS',
  'android.permission.VIBRATE',
  'android.permission.RECEIVE_BOOT_COMPLETED'
];
const anchor = '<uses-permission android:name="android.permission.INTERNET" />';
if (!x.includes(anchor)) { console.error('INTERNET permission line not found'); process.exit(1); }
perms.forEach(function (a) {
  if (!x.includes(a)) {
    x = x.replace(anchor, anchor + '\n    <uses-permission android:name="' + a + '" />');
  }
});
fs.writeFileSync(p, x);
console.log('Manifest patched');
