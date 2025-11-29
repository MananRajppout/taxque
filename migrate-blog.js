

const baseURL = "https://taxque.in/wp-json/wp/v2/posts"
const getBlog = async (url) => {
    const blog = await fetch(url);
    const p = await blog.json();

    return {
        id: p.id,
        title: p.title.rendered,
        content: p.content.rendered,
        excerpt: p.excerpt.rendered,
        slug: p.slug,
        date: new Date(p.date),
        categories: p.categories,
        tags: p.tags,
        featured_media: p.featured_media,

    }
}


const addBlogToDb = async (id) => {
    const url = `${baseURL}/${id}`;
    const blog = await getBlog(url);
    
    let imageUrl = "";
    if (blog.featured_media) {
        try {
            const mediaResponse = await fetch(`https://taxque.in/wp-json/wp/v2/media/${blog.featured_media}`);
            const mediaData = await mediaResponse.json();
            imageUrl = mediaData?.source_url || mediaData?.guid?.rendered || "";
        } catch (error) {
            console.error(`Error fetching media for blog ${id}:`, error);
        }
    }

    const taxqueBlogData = {
        title: blog.title,
        Slug: blog.slug,
        description: blog.excerpt.replace(/<[^>]*>/g, '').trim(), // Remove HTML tags from excerpt
        metaTitle: blog.title, // Use title as metaTitle
        metaDescription: blog.excerpt.replace(/<[^>]*>/g, '').trim().substring(0, 160), // Use excerpt as metaDescription (limit to 160 chars)
        imageUrl: imageUrl || "https://via.placeholder.com/800x400", // Fallback image if no featured media
        blogText: [
            {
                title: blog.title,
                summarys: [
                    {
                        summary: blog.content.replace(/<[^>]*>/g, '').trim() // Convert HTML content to plain text
                    }
                ]
            }
        ],
        date: blog.date.toLocaleDateString("en-GB"),
        category: blog.categories && blog.categories.length > 0 ? blog.categories[0].toString() : "General",
        status: "Published",
        tags: blog.tags && blog.tags.length > 0 ? blog.tags.map(tag => tag.toString()) : [],
        FAQ: [],
        allowComments: true
    };

    const apiBaseURL = process.env.TAXQUE_API_URL || "http://localhost:5000/taxque/api";
    const createBlogURL = `${apiBaseURL}/blog/create`;

    try {
        const response = await fetch(createBlogURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taxqueBlogData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`Blog "${blog.title}" added successfully`);
            return result;
        } else {
            const errorData = await response.json();
            console.error(`Error adding blog "${blog.title}":`, errorData);
            throw new Error(`Failed to add blog: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error adding blog "${blog.title}":`, error);
        throw error;
    }
}


const getBlogs = async (url, page = 1,limit = 10,total = 0) => {
    const blogs = await fetch(`${url}?page=${page}&per_page=${limit}`);
    const res = await blogs.json();


    if(res?.data?.status == 400){
        return total;
    }

    
    await Promise.all(res.map((blog) => addBlogToDb(blog.id)));

    let hasMore = res.length === limit;
    if (hasMore) {
        return await getBlogs(url, page + 1, limit,total + res.length);
    }else{
        return total;
    }
}


(async () => {
    const totalBlogs = await getBlogs(baseURL, 1, 10);
    console.log(`Total blogs Added: ${totalBlogs}`);
})();