async function jina_web_search(params, userSettings) {
  const { search_phrase, includeImages = false, numResults = 5 } = params;
  const { jinaApiKey } = userSettings;

  if (!search_phrase) {
    throw new Error('I need to know what to search for!');
  }

  if (!jinaApiKey) {
    throw new Error('Missing Jina API key. Add it under the plugin\'s "Jina API Key" setting.');
  }

  // Jina caps the number of results; keep the value a sane positive integer.
  const count = Math.min(Math.max(parseInt(numResults, 10) || 5, 1), 20);

  const headers = {
    'Authorization': `Bearer ${jinaApiKey}`
  };

  // Jina only strips images when X-Retain-Images is exactly "none"; omitting it keeps them.
  if (!includeImages) {
    headers['X-Retain-Images'] = 'none';
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  let response;
  try {
    response = await fetch(
      `https://s.jina.ai/${encodeURIComponent(search_phrase)}?count=${count}`,
      { method: 'GET', headers, signal: controller.signal }
    );
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Jina search timed out after 30 seconds.');
    }
    throw new Error(`Jina search request failed: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Jina search failed (${response.status} ${response.statusText})${body ? `: ${body}` : ''}`
    );
  }

  return await response.text();
}

