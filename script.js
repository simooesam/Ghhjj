
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ضبط أبعاد الشاشة لتتناسب مع الهاتف
canvas.width = window.innerWidth * 0.9; // عرض الشاشة بنسبة 90%
canvas.height = window.innerHeight * 0.6; // ارتفاع الشاشة بنسبة 60%

// اللاعب
const player = {
  x: 50,
  y: canvas.height - 70,
  width: 50,
  height: 50,
  speed: 5,
  jumpHeight: 15,
  isJumping: false,
  velocityY: 0,
  image: new Image(),
};

player.image.src = 'https://via.placeholder.com/50'; // صورة اللاعب

// الأرضية
const ground = {
  x: 0,
  y: canvas.height - 20,
  width: canvas.width,
  height: 20,
  color: 'green',
};

// التحكم باللمس
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// أحداث اللمس
canvas.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  e.preventDefault(); // منع السلوك الافتراضي
});

canvas.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // الحركة أفقية
    if (deltaX > 0) {
      player.x += player.speed * 10; // تحرك لليمين
    } else {
      player.x -= player.speed * 10; // تحرك لليسار
    }
  } else {
    // الحركة رأسية (قفز)
    if (deltaY < 0 && !player.isJumping) {
      player.isJumping = true;
      player.velocityY = -player.jumpHeight;
    }
  }
  e.preventDefault(); // منع السلوك الافتراضي
});

// تحديث اللاعب
function updatePlayer() {
  // الجاذبية
  player.velocityY += 0.8; // تسارع الجاذبية
  player.y += player.velocityY;

  // منع اللاعب من السقوط تحت الأرضية
  if (player.y + player.height >= ground.y) {
    player.y = ground.y - player.height;
    player.isJumping = false;
  }

  // منع اللاعب من الخروج من حدود الشاشة
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// رسم اللاعب
function drawPlayer() {
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

// رسم الأرضية
function drawGround() {
  ctx.fillStyle = ground.color;
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

// تحديث اللعبة
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // مسح الشاشة
  updatePlayer(); // تحديث حركة اللاعب
  drawGround(); // رسم الأرضية
  drawPlayer(); // رسم اللاعب
  requestAnimationFrame(updateGame); // تشغيل الحلقة
}

// بدء اللعبة
updateGame();
    