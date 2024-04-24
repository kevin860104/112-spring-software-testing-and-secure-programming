const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
	// Hints:
    // Click search button
    // Type into search box
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title
    // Print the title
    // Close the browser
    await page.goto('https://pptr.dev/'); //前往網頁
    await page.waitForSelector('.DocSearch-Button'); //等待.DocSearch-Button元素出現
    await page.click('.DocSearch-Button'); //點擊指定按鈕
    
    await page.waitForSelector('.DocSearch-Form'); //等待DocSearch-Form的元素出現在頁面上
    
	//將文字 'chipi chipi chapa chapa' 輸入搜尋欄位
	await page.type('#docsearch-input.DocSearch-Input', 'chipi chipi chapa chapa',{delay: 2000}); 
	
	//等待 #docsearch-item-5 a出現在頁面上
    await page.waitForSelector('#docsearch-item-5 a'); 

    await page.click('#docsearch-item-5 a'); //點擊#docsearch-item-5 a按鈕
	
    const title_target = 'h1'; //指向目標網頁的h1標籤
	const title_target_Element = await page.waitForSelector(title_target); //h1元素出現，它將返回這個元素的引用，存儲於 titleElement
	
	//將儲存的變數title_target_Element經過evaluate(element=> element.textContent)成功將內文存在getflag
    const getflag = await title_target_Element.evaluate(element=> element.textContent);
	
	console.log(getflag);//最後將目標文字列出來

    await browser.close();
})();
