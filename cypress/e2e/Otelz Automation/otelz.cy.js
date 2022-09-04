/// <reference types = "Cypress"/>

let url = "https://www.otelz.com/";
let locationSearchBtnPath = "[data-testid='locationSearchBtn']";
let searchBtnPath = "[testid='searchBtn']";

context("Case 1: Siteye giriş ve doğrulama", () => {
    it("Siteye giriş", () => {
        cy.visit(url)
    })

    it("Url Doğrulama", () => {
        cy.url().should("include", url)
    })

})

context("Case 2: Arama kutusuna istanbul yazımı, doğrulaması ve silimi", () => {

    it("Arama İnputuna İstanbul Yazılır", () => {
        cy.get(locationSearchBtnPath).type("istanbul")
    })

    it("Arama inputuna yazılan değer doğrulanır", () => {
        cy.get(locationSearchBtnPath).should('have.value', 'istanbul')
    })

    it("Arama inputuna yazılan değeri silinir", () => {
        cy.get(locationSearchBtnPath).clear()
    })

})

context("Case 3: Arama kutusuna adilcevaz yazımı ve seçimi", () => {

    it("Arama İnputuna adilcevaz yazılır", () => {
        cy.get(locationSearchBtnPath).type("adilcevaz")
    })

    it("Aramadan dönen ilk adil cevaz sonucu seçilir", () => {
        const firstSearchItemPath = "//*[@id='searchbar_1']/div/div[1]/div[2]/ul/li[1]"
        cy.xpath(firstSearchItemPath).click()
    })

})

context("Case 4: Tarih kutusu açılır gidiş dönüş için 2 gün sonrası seçilir ve arama butonuna tıklanır", () => {

    it("Tarih kutusu açılır ve gidiş için 2 gün ilerisi seçilir", () => {
  
      cy.get("[class] [data-testid='datepickerBtn']:nth-of-type(1)").click(); 
  
      const defaultSelectedDate = "//div[@tabindex='0']"
  
        cy.xpath(defaultSelectedDate).focus()
        .type('{rightarrow}')
        .focused()
        .type('{rightarrow}')
        .focused()
        .type('{enter}')
       
    })
  
    it("Dönüş için 2 gün ilerisi seçilir (Yani yeni gidiş tarihi + 1 gün)", () => {
  
      const newSelectedDate = "//div[@tabindex='0']"
  
        cy.xpath(newSelectedDate).focus()
        .type('{rightarrow}')
        .focused()
        .type('{enter}')
       
    })

    it("Arama butonuna tıklamnır", () => {
        cy.get(searchBtnPath).click();
    })
  
  })

context("Case 5: İlk çıkan otelin fiyat bilgisinin alınması ve detay sayfasındaki fiyat bilgisi ile karşılaştırılamsı", () => {

    it("İlk çıkan otel fiyat bilgisi alınır ve otel detayına geçilip fiyat doğrulaması yapılır", () => {

        let firstHotelPricePath = "//div[@data-testid='otel-1']//div[@class='price']";
        let firstHotelPath = "//div[@data-testid='otel-1']//div[@class='img_wrapper']";
        let firstHotelDescPricePath = "//div[@class='net-price']";
        let firstPrice = "";

        cy.xpath(firstHotelPricePath).then(priceDiv => {

            firstPrice = priceDiv.text()

            cy.xpath(firstHotelPath).click()

            cy.xpath(firstHotelDescPricePath).should('have.text', firstPrice)

        });

    });

});

context("Case 6: Selectboxtan bir oda seçilir ve rezervasyon yap butonuna tıklanılır", () => {

    it("Selectboxtan oda seçilir", () => {

        const roomSelectBoxPath = "div:nth-of-type(1) > .col-1.select > div > .roomSelectBox";

        cy.get(roomSelectBoxPath).select('1');

    });

    it("Rezervasyon yap butonuna tıklanır", () => {

        const reservationBtnPath = "//div[@id='totalPrice']/button[@type='button']";

        cy.xpath(reservationBtnPath).click()

    });

});

context("Case 7: Rezervasyon birinci sayfasında kişi bilgileri girilir ve devam edilir", () => {

    it("Kişi bilgileri girilir", () => {

        const nameInputXpath = "//input[@name='customerInfo.name']";
        const surnameInputXpath = "//input[@name='customerInfo.surname']";
        const emailInputXpath = "//input[@name='customerInfo.email']";
        const phoneInputXpath = "//input[@name='customerInfo.phone']";

        cy.xpath(nameInputXpath).type('testName')
        cy.xpath(surnameInputXpath).type('testSurname')
        cy.xpath(emailInputXpath).type('test@testmail.com')
        cy.xpath(phoneInputXpath).type('5555555555')

    });

    it("Kaydet butonuna tıklanarak devam edilir.", () => {

        const submitBtnPath = "//button[@type='submit' and contains(text(),Kaydet)]";

        cy.xpath(submitBtnPath).click()

    });

});

context("Case 8: Online ödeme olduğu doğrulanır", () => {

    it("Online ödeme bilgilendirilmesi doğrulanır.", () => {

        const onlinePaymentType = "//div[@class='payment-types']/div[4]"
        cy.xpath(onlinePaymentType).should('be.visible')
        cy.xpath(onlinePaymentType).click()
    });

});
