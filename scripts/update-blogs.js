const { writeIndexFile } = require("./util.js");

const BLOGS_FILES_URL = 'https://api.github.com/repos/a6h15hek/a6h15hek/contents/blogs';
const INDEX_BLOG_FILE_URL = 'https://api.github.com/repos/a6h15hek/a6h15hek/contents/blogIndex.md';

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const fetchAllBlogsFile = async (url, result) => {
    try{
        var myRequest = new Request(url, { headers: new Headers({'accept':'application/vnd.github.v3.raw'})});
        const response = await fetch(myRequest);
        const blogFilesList = await response.json();
        if(Array.isArray(blogFilesList)){
            result({success: true, blogFilesList})
        }else{
            console.log("Error in fetching file Response.", blogFilesList);
            result({success: false, message: ""})
        }
    }catch(e){
        console.log("Error in fetching file Response.", e);
        result({success: false, message: e});
    }
};

const fetchGithubFileTextContent = async (url, result) => {
    console.log("request2");
    try{
        var myRequest = new Request(url, { headers: new Headers({'accept':'application/vnd.github.v3.raw'})});
        const response = await fetch(myRequest);
        const markdown = await response.text();
        if(!isJsonString(markdown)){
            result({success: true, markdown})
        }else{
            console.log("Error in fetching file Response.", markdown);
            result({success: false, message: ""})
        }
    }catch(e){
        console.log("Error in fetching file Response.", e);
        result({success: false, message: e});
    }
};

const parseMarkdownWithYamlFrontmatter = markdown => {
    const metaRegExp = new RegExp(/^---[\n\r](((?!---).|[\n\r])*)[\n\r]---$/m)
  
    // "rawYamlHeader" is the full matching string, including the --- and ---
    // "yamlVariables" is the first capturing group, which is the string content between the --- and ---
    const [rawYamlHeader, yamlVariables] = metaRegExp.exec(markdown) ?? []
  
    if (!rawYamlHeader || !yamlVariables) {
      return null;
    }

    const markdownContent = markdown.replace(rawYamlHeader, "").trim();

    return {
        yamlVariables :yamlVariables.trim(),
        markdownContent
    }
};



function createIndexFileContent(allBlogsYamlProperties = [] ) {
    fetchGithubFileTextContent(INDEX_BLOG_FILE_URL, indexContent => {
        
        if(indexContent.success){
            const {yamlVariables : indexYamlProperties, markdownContent} = parseMarkdownWithYamlFrontmatter(indexContent.markdown);
            if(indexYamlProperties !== null){
                
                const indexFileText = "---\n" +
                indexYamlProperties.split("=====")[0].trim() +
                "\n=====\n" + 
                allBlogsYamlProperties.join("\n=====\n") +
                "\n---\n\n" +
                markdownContent;

                writeIndexFile("blogIndex.md", indexFileText);
                console.log("final text: \n" + indexFileText);
                return;
            }else{
                console.log("Failed: Index Yaml properties are null.", indexContent.message);
            }
        }else{
            console.log("Failed: Cannot Index blog files.", indexContent.message);
        }
    });
}

const main = async () => {
    const allBlogsYamlProperties = [];
    fetchAllBlogsFile(BLOGS_FILES_URL, fileResponse => {
        if(fileResponse.success ){  
            fileResponse.blogFilesList.forEach(file => {
                fetchGithubFileTextContent(BLOGS_FILES_URL + "/" + file.name, blogResult => {
                    console.log(file.name);
                    
                    if(blogResult.success){
                        const { yamlVariables : yamlProperties } = parseMarkdownWithYamlFrontmatter(blogResult.markdown);
                        
                        if(yamlProperties !== null){
                            allBlogsYamlProperties.push(yamlProperties);
                            
                            if(allBlogsYamlProperties.length === fileResponse.blogFilesList.length - 1){
                                createIndexFileContent(allBlogsYamlProperties);
                            }
                            
                        }else{
                            console.log("Failed: YAML properties found null for file: " + file.name);
                        }
                    }else{
                        console.log("Failed: Cannot fetch blog files.", blogResult.message);
                    }
                });
            })
        }else{
            console.log("Failed: Cannot fetch blog files List.", fileResponse);
            console.log("Creating Index file with 0 blog metadata...");
            createIndexFileContent();
        }
    });

};

main();