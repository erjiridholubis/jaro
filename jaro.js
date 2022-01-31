function jaro_distance(s1,s2) {

  if (s1 == s2) {
    return 1.0;
  }

  var len1 = s1.length;
  var len2 = s2.length;

  var max_dist = Math.floor(Math.max(len1, len2) / 2) - 1;
  var match = 0;
  var hash_s1 = new Array(s1.length)
  var hash_s2 = new Array(s2.length);
  hash_s2[0] = 0;

  for (var i = 0; i < len1; i++) {

    for (var j = Math.max(0, i - max_dist); j < Math.min(len2, i + max_dist + 1); j++) {

      if (s1.charAt(i) == s2.charAt(j) && hash_s2[j] == 0)
      {
          hash_s1[i] = 1;
          hash_s2[j] = 1;
          match++;
          break;
      }
    }

  }

  if (match == 0) {
    return 0.0;
  }

  var t = 0.0;
  var point = 0;


  for (var i = 0; i < len1; i++) {
    if (hash_s1[i] == 1) {
        while (hash_s2[point] == 0)
            point++;

        if (s1.charAt(i) != s2.charAt(point++) )
            t++;
    }
  }

  t /= 2;

  return (match / len1 + match / len2+ (match - t + 1) / match) / 3.0;

}
