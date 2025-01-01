async function jina_web_search(params, userSettings) {
  const { search_phrase } = params;
  const { url, includeImages = false, numResults = 5 } = params;
  const { jinaApiKey } = userSettings;

  if (!search_phrase) {
    throw new Error('I need to know what to search for!');
  }

  try {
    const response = await fetch(`https://s.jina.ai/${encodeURIComponent(search_phrase)}?count=${numResults}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jinaApiKey}`,
        'X-Retain-Images': includeImages.toString()
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}` );
    }

    const contentType = response.headers.get('content-type');

    let content;
    if (contentType.includes('application/json')) {
      content = await response.json();
    } else if (contentType.includes('text/html') || contentType.includes('text/plain')) {
      content = await response.text();
    } else {
      content = await response.blob();  // Handle binary data types or other formats
    }

    return content;

  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

