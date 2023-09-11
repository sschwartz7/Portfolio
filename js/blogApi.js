function fetchBlogData() {
    const baseUrl = 'https://mstb.up.railway.app';

    fetch(`${baseUrl}/api/BlogPost/3`)
        .then((response) => response.json())
        .then(function (data) {
            displayBlogData(data, baseUrl);
        });
}

function displayBlogData(blogPosts, baseUrl) {
    let template = document.getElementById('blog-template');
    let blogSection = document.getElementById('blogs');


    blogPosts.forEach((blogPost) => {
        const blogPostCard = document.importNode(template.content, true);
        //format image
        let imageDiv = blogPostCard.querySelector('.blog-image-link');
        imageDiv.setAttribute(
            "href",
            `${baseUrl}/content/${blogPost.slug}`
        );

        let imgTag = document.createElement('img');
        imgTag.setAttribute(
            "src",
            `data:${blogPost.imageFileType};base64,${blogPost.imageFileData}`
        );
        imgTag.classList.add('blog-image');
        imageDiv.appendChild(imgTag);
        // <img src="data:image/gif;base64,xxxxxxxxxxxxx..." class="blog-image" alt="...">
        //add title
        let blogTitleDiv = blogPostCard.querySelector('.blog-title');
        blogTitleDiv.innerHTML = blogPost.title;

        let blogDate = new Date(blogPost.created); // 2009-11-10
        let month = blogDate.toLocaleString('default', { month: 'long' });
        let day = blogDate.getDate();

        //add day
        let blogDayDiv = blogPostCard.querySelector(".blog-day");
        blogDayDiv.innerHTML = day;

        //add month
        let blogMonthDiv = blogPostCard.querySelector('.blog-month');

        blogMonthDiv.innerHTML = month;

        //add content
        let blogContentDiv = blogPostCard.querySelector('.blog-content');
        blogContentDiv.innerHTML = blogPost.content;

        //readmore link
        let blogLink = blogPostCard.querySelector('.read-more-link');
        blogLink.setAttribute(
            "href",
            `${baseUrl}/content/${blogPost.slug}`
        );

        let blogPubDate = blogPostCard.querySelector('.publishedDate');

        let dateToday = new Date();
        let createdDate = new Date(
            blogPost.updated != null ? blogPost.updated : blogPost.created
        );
        let diffTime = Math.abs(dateToday.getTime() - createdDate.getTime());
        let lastUpdated = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (lastUpdated == 1) {
            blogPubDate.innerHTML = `Published ${lastUpdated} day ago`;
        } else {
            blogPubDate.innerHTML = `Published ${lastUpdated} days ago`;
        }

        blogSection.appendChild(blogPostCard);
    });


}