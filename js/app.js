document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal')
  const closeModalBtn = document.querySelector('.close')
  const addToCartBtn = document.getElementById('add-to-cart')
  const quantitySpan = document.getElementById('quantity')
  const decreaseBtn = document.getElementById('decrease')
  const increaseBtn = document.getElementById('increase')
  const cartCountSpan = document.getElementById('cart-count')

  let currentProductId = null

  // Загрузка количества товаров из localStorage или установка значения по умолчанию
  let cart = JSON.parse(localStorage.getItem('cart')) || {}
  updateCartCount()

  // Обработчики событий для кнопок "Подробнее"
  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const parentCard = button.closest('.product-card')
      const name = parentCard.dataset.name
      const description = parentCard.dataset.description
      const imgSrc = parentCard.dataset.img
      const productId = parentCard.dataset.id

      document.getElementById('modal-title').textContent = name
      document.getElementById('modal-description').textContent = description
      document.getElementById('modal-img').setAttribute('src', imgSrc)

      // Устанавливаем количество товара в модальном окне
      if (cart[productId]) {
        quantitySpan.textContent = cart[productId]
      } else {
        quantitySpan.textContent = 1 // По умолчанию 1 товар
      }

      currentProductId = productId

      // Показываем модальное окно
      modal.style.display = 'block'
    })
  })

  // Закрытие модального окна при клике на крестик
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  // Управление количеством товара в модальном окне
  decreaseBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantitySpan.textContent)
    if (currentQuantity > 1) {
      quantitySpan.textContent = currentQuantity - 1
    }
  })

  increaseBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantitySpan.textContent)
    quantitySpan.textContent = currentQuantity + 1
  })

  // Добавление товара в корзину
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantitySpan.textContent)
    if (currentProductId) {
      if (cart[currentProductId]) {
        cart[currentProductId] += quantity // Добавляем к существующему количеству
      } else {
        cart[currentProductId] = quantity // Устанавливаем новое количество
      }
      localStorage.setItem('cart', JSON.stringify(cart)) // Сохраняем в localStorage
      updateCartCount() // Обновляем счетчик товаров в корзине на странице
    }
    modal.style.display = 'none' // Закрываем модальное окно
  })

  // Функция для обновления счетчика товаров в корзине на странице
  function updateCartCount () {
    let totalCount = 0
    for (let productId in cart) {
      totalCount += cart[productId]
    }
    cartCountSpan.textContent = totalCount
  }
})
