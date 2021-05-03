
# mirror meta data location

[URL]/current.json


# Format / Example

All languages supported by the app must be included for any text that is to be presented. 

```
{
  "mirrorId":"us-east-1",
  "siteUrl":"https://www.bdrc.io",
  "libraryUrl":"https://library.bdrc.io",
  "tosUrl":"https://www.bdrc.io/access-policies/",
  "viewerUrlPrefix":"https://library.bdrc.io/scripts/embed-iframe.html",
  "releaseSerialNumber": 6,
  "releaseDate":"2020-12-31T10:28:27+00:00",
  "releaseZipUrl":"https://staticfiles.bdrc.io/BDRCLibApp/1.2/BDRCLIB.zip",
  "releaseDescription":[
    {
      "value":"12/31/2020",
      "language":"en"
    },
    {
      "value":"སྤྱི་ལོ2020ཟླ12ཚེས31",
      "language":"bo"
    },
    {
      "value":"2020年12月31日",
      "language":"zh"
    }
  ],
  "changeLogUrl":"https://www.bdrc.io/changelog.html"
}

```

# Zip Structure

Must be named BDRCLIB.zip, and unzip to a folder named BDRCLIB with the following data structure:

```
works-0.json
works/00.json
works/[first_two_chars_of_MD5_hashed_RID].json
workparts-8.json
workparts-7.json
workparts-6.json
workparts-5.json
workparts-4.json
workparts-3.json
workparts-2.json
workparts-1.json
workparts-0.json
workparts/00.json
workparts/[first_two_chars_of_MD5_hashed_RID].json
persons/00.json
persons/[first_two_chars_of_MD5_hashed_RID].json
```


