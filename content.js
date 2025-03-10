(function() {
    console.log("Content script running");
  
    function clickRadioButton() {
      const iframe = document.querySelector('iframe.goog-reviews-write-widget');
      if (iframe) {
        try {
          const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
          if (iframeDocument && iframeDocument.body) {
            const popupBody = iframeDocument.querySelector('body.EIlDfe'); // Select the body element
            if (popupBody) {
              setTimeout(function() {
                const radioButtons = popupBody.querySelectorAll('[role="radio"]');
                if (radioButtons.length > 4) {
                  console.log("Radio buttons found in popup!");
                  radioButtons[4].click();
                  observer.disconnect(); // Stop observing
                } else {
                  console.log("Radio buttons not found in popup.");
                }
              }, 500);
            } else {
              console.log("Popup body not found in iframe.");
            }
          } else {
            console.log("Body not found in iframe.");
          }
        } catch (error) {
          console.error("Error accessing iframe content:", error);
        }
      } else {
        console.log("Iframe with class goog-reviews-write-widget not found.");
      }
    }
  
    const observer = new MutationObserver(function(mutations) {
      clickRadioButton();
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
  })();