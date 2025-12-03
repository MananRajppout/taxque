
const wpBaseURL = "https://taxque.in/wp-json/wp/v2";
const apiBaseURL = process.env.TAXQUE_API_URL || "http://localhost:5000/taxque/api";

const createCategoryURL = `${apiBaseURL}/blog-category/create`;
const createTagURL = `${apiBaseURL}/blog-tag/create`;

const fetchFromWP = async (endpoint, page = 1, limit = 100) => {
    const url = `${wpBaseURL}/${endpoint}?page=${page}&per_page=${limit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 400) return []; // End of pagination usually returns 400 in WP API
            throw new Error(`Failed to fetch from WP: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint} page ${page}:`, error);
        return [];
    }
};

const createLocalEntity = async (url, data, type) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            console.log(`${type} "${data.name}" created successfully.`);
            return true;
        } else if (response.status === 409 || (result.message && result.message.includes('exists'))) {
            console.log(`${type} "${data.name}" already exists.`);
            return true; // Treat as success to continue
        } else {
            console.error(`Error creating ${type} "${data.name}":`, result);
            return false;
        }
    } catch (error) {
        console.error(`Exception creating ${type} "${data.name}":`, error);
        return false;
    }
};

const decodeHTMLEntities = (text) => {
    if (!text) return "";
    return text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&nbsp;/g, ' ');
};

const migrateCategories = async () => {
    console.log("Starting Category Migration...");
    let page = 1;
    let totalMigrated = 0;

    while (true) {
        const categories = await fetchFromWP('categories', page);
        if (!categories || categories.length === 0) break;

        for (const cat of categories) {
            const categoryData = {
                name: decodeHTMLEntities(cat.name),
                slug: cat.slug,
                description: decodeHTMLEntities(cat.description),
            };
            await createLocalEntity(createCategoryURL, categoryData, "Category");
            totalMigrated++;
        }
        page++;
    }
    console.log(`Category Migration Completed. Total: ${totalMigrated}`);
};

const migrateTags = async () => {
    console.log("Starting Tag Migration...");
    let page = 1;
    let totalMigrated = 0;

    while (true) {
        const tags = await fetchFromWP('tags', page);
        if (!tags || tags.length === 0) break;

        for (const tag of tags) {
            const tagData = {
                name: decodeHTMLEntities(tag.name),
                slug: tag.slug,
                description: decodeHTMLEntities(tag.description),
            };
            await createLocalEntity(createTagURL, tagData, "Tag");
            totalMigrated++;
        }
        page++;
    }
    console.log(`Tag Migration Completed. Total: ${totalMigrated}`);
};

(async () => {
    await migrateCategories();
    await migrateTags();
})();