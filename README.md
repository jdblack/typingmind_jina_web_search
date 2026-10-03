# Jina Web Search

## Overview

This TypingMind Plugin uses the Jina.AI web search to search for matching
webpages for your LLM chats.

## Usage

Simply ask the LLM to "search the web with jina for [SOME PHRASE HERE]".

The tool accepts the following parameters:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_phrase` | string | _(required)_ | The phrase to search for on the web |
| `numResults` | integer | `5` | Number of results to return (1-20) |
| `includeImages` | boolean | `false` | Whether to keep images in the returned pages |

## Installation

1. Go to https://typingmind.com, select plugins on the left, and the blue
   "Import" button on the right.

2. Enter the repository url:
   https://github.com/jdblack/typingmind_jina_web_search

3. Go to https://jina.ai/reader and make an API key. At the time of this
   writing, the first 300k tokens are free, and thereafter $20 per billion.

4. Open the plugin settings in TypingMind and paste the key into the
   "Jina API Key" field.

