let roll_dice_button = document.getElementById("roll_dice_button");
// let dice_number_span = document.getElementById("dice_number_span");

// Dice image
let dice_image = document.getElementById("dice_image");

// Sounds
let dice_sound = new Audio("./Assets/dice_sound.mp3");
let moving_player_sound = new Audio("./Assets/moving_player_sound.mp3");
let climbing_ladder_sound = new Audio("./Assets/climbing_ladder_sound.mp3");
let snake_eating_player_sound = new Audio(
  "./Assets/snake_eating_player_sound.mp3"
);

// Player
let player_1 = document.getElementById("player_1");
let player_2 = document.getElementById("player_2");

// Which player is selected
let player_1_selected_svg = document.getElementById("player_1_selected_svg");
let player_2_selected_svg = document.getElementById("player_2_selected_svg");

// Player sum
let player_1_sum = 0;
let player_2_sum = 0;

// Chance
let player_1_chance = true;
let player_chance = document.getElementById("player_chance");

// progress_bar
let progress_bar = document.getElementById("progress_bar");
let progress_bar_div = document.getElementById("progress_bar_div");
let progress_bar_value = document.getElementById("progress_bar_value");
let progress_bar_width = 0;

// Start window and start button
let start_button = document.getElementById("start_button");
let start_window = document.getElementById("start_window");

// start_button click
start_button.addEventListener("click", () => {
  progress_bar_div.classList.remove("opacity-0");
  let intervalID = setInterval(() => {
    if (progress_bar_width <= 100) {
      progress_bar_value.innerText = progress_bar_width;
      progress_bar.style.width = `${progress_bar_width}%`;
      progress_bar_width++;
    } else {
      clearInterval(intervalID);
      setTimeout(() => {
        start_window.classList.add("hidden");
      }, 1000);
    }
  }, 15);
});

roll_dice_button.addEventListener("click", () => {
  // dice sound when dice is rolling
  dice_sound.play();
  let dice_number = Math.random() * 6 + 1;
  dice_number = Math.floor(dice_number);
  // dice_number_span.innerText = dice_number;
  dice_image.src = "./Assets/dice-animation.gif";
  roll_dice_button.disabled = true;
  setTimeout(() => {
    switch (dice_number) {
      case 1:
        dice_image.src = "./Assets/dice number 1.jpg";
        break;
      case 2:
        dice_image.src = "./Assets/dice number 2.jpg";
        break;
      case 3:
        dice_image.src = "./Assets/dice number 3.jpg";
        break;
      case 4:
        dice_image.src = "./Assets/dice number 4.jpg";
        break;
      case 5:
        dice_image.src = "./Assets/dice number 5.jpg";
        break;
      case 6:
        dice_image.src = "./Assets/dice number 6.jpg";
        break;

      default:
        break;
    }
    if (player_1_chance) {
      player_1_chance = false;
      player_1_sum = move_player(dice_number, player_1, player_1_sum);
      player_chance.innerText = "Player 2 Turn";
      player_2_selected_svg.classList.remove("hidden");
      player_1_selected_svg.classList.add("hidden");
    } else {
      player_1_chance = true;
      player_2_sum = move_player(dice_number, player_2, player_2_sum);
      player_chance.innerText = "Player 1 Turn";
      player_2_selected_svg.classList.add("hidden");
      player_1_selected_svg.classList.remove("hidden");
    }
    roll_dice_button.disabled = false;
  }, 1300);
});

function move_player(dice_number, player, player_sum) {
  // moving sound when player move
  moving_player_sound.play();

  let current_position = player_sum;
  player_sum += dice_number;
  let x = player_sum;
  console.log("x = ", x);
  if (player_sum <= 10) {
    player.style.left = `${x * 50 - 50}px`;
    // If player on ladder 1 then change the player_sum
    if (player_sum === 4) {
      player_sum += 32;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `200px`;
        player.style.bottom = `150px`;
      }, 800);
    }
  } else if (player_sum > 10 && current_position <= 10) {
    player.style.left = `450px`;
    setTimeout(() => {
      player.style.bottom = `50px`;
      setTimeout(() => {
        player.style.left = `${x * 50 - 100 * (x - 10)}px`;
      }, 400);
    }, 800);
    // If player on ladder 2 then change the player_sum
    if (player_sum === 12) {
      player_sum += 21;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `350px`;
        player.style.bottom = `150px`;
      }, 1600);
    }
  } else if (player_sum <= 20) {
    player.style.left = `${x * 50 - 100 * (x - 10)}px`;
    player.style.bottom = `50px`;
    // If player on ladder 2 then change the player_sum
    if (player_sum === 12) {
      player_sum += 21;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `350px`;
        player.style.bottom = `150px`;
      }, 800);
    }
  } else if (player_sum > 20 && current_position <= 20) {
    player.style.left = `0px`;
    setTimeout(() => {
      player.style.bottom = `100px`;
      setTimeout(() => {
        x = x - 20;
        player.style.left = `${x * 50 - 50}px`;
      }, 400);
    }, 800);
    // If player on ladder 3 then change the player_sum
    if (player_sum === 22) {
      player_sum += 36;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `100px`;
        player.style.bottom = `250px`;
      }, 1600);
    }
  } else if (player_sum <= 30) {
    x = x - 20;
    player.style.left = `${x * 50 - 50}px`;
    player.style.bottom = `100px`;
    // Check if player is eaten by snake 1
    if (player_sum === 29) {
      player_sum -= 20;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `400px`;
        player.style.bottom = `0px`;
      }, 800);
    }
    // If player on ladder 3 then change the player_sm & player position
    if (player_sum === 22) {
      player_sum += 36;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `100px`;
        player.style.bottom = `250px`;
      }, 800);
    }
  } else if (player_sum > 30 && current_position <= 30) {
    player.style.left = `450px`;
    setTimeout(() => {
      player.style.bottom = `150px`;
      setTimeout(() => {
        x = x - 20;
        player.style.left = `${x * 50 - 100 * (x - 10)}px`;
      }, 400);
    }, 800);
  } else if (player_sum <= 40) {
    x = x - 20;
    player.style.left = `${x * 50 - 100 * (x - 10)}px`;
    player.style.bottom = `150px`;
    // Check if player is eaten by snake 2
    if (player_sum === 39) {
      player_sum -= 37;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `50px`;
        player.style.bottom = `0px`;
      }, 800);
    }
  } else if (player_sum > 40 && current_position <= 40) {
    player.style.left = `0px`;
    setTimeout(() => {
      player.style.bottom = `200px`;
      setTimeout(() => {
        x = x - 40;
        player.style.left = `${x * 50 - 50}px`;
      }, 400);
    }, 800);
    // If player on ladder 4 then change the player_sum
    if (player_sum === 46) {
      player_sum += 19;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `200px`;
        player.style.bottom = `300px`;
      }, 1600);
    }
  } else if (player_sum <= 50) {
    x = x - 40;
    player.style.left = `${x * 50 - 50}px`;
    player.style.bottom = `200px`;
    // Check if player is eaten by snake 3
    if (player_sum === 48) {
      player_sum -= 32;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `200px`;
        player.style.bottom = `50px`;
      }, 800);
    }
    // If player on ladder 4 then change the player_sum & player position
    if (player_sum === 46) {
      player_sum += 19;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `200px`;
        player.style.bottom = `300px`;
      }, 800);
    }
  } else if (player_sum > 50 && current_position <= 50) {
    player.style.left = `450px`;
    setTimeout(() => {
      player.style.bottom = `250px`;
      setTimeout(() => {
        x = x - 40;
        player.style.left = `${x * 50 - 100 * (x - 10)}px`;
      }, 400);
    }, 800);
  } else if (player_sum <= 60) {
    x = x - 40;
    player.style.left = `${x * 50 - 100 * (x - 10)}px`;
    player.style.bottom = `250px`;
  } else if (player_sum > 60 && current_position <= 60) {
    player.style.left = `0px`;
    setTimeout(() => {
      player.style.bottom = `300px`;
      setTimeout(() => {
        x = x - 60;
        player.style.left = `${x * 50 - 50}px`;
      }, 400);
    }, 800);
    // If player on ladder 5 then change the player_sum
    if (player_sum === 61) {
      player_sum += 37;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `100px`;
        player.style.bottom = `450px`;
      }, 1600);
    }
    // If player on ladder 6 then change the player_sum & player position
    if (player_sum === 69) {
      player_sum += 21;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `450px`;
        player.style.bottom = `400px`;
      }, 1600);
    }
  } else if (player_sum <= 70) {
    x = x - 60;
    player.style.left = `${x * 50 - 50}px`;
    player.style.bottom = `300px`;
    // Check if player is eaten by snake 4
    if (player_sum === 67) {
      player_sum -= 35;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `400px`;
        player.style.bottom = `150px`;
      }, 800);
    }
    // If player on ladder 5 then change the player_sum & player position
    if (player_sum === 61) {
      player_sum += 37;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `100px`;
        player.style.bottom = `450px`;
      }, 800);
    }
    // If player on ladder 6 then change the player_sum & player position
    if (player_sum === 69) {
      player_sum += 21;
      setTimeout(() => {
        climbing_ladder_sound.play();
        player.style.left = `450px`;
        player.style.bottom = `400px`;
      }, 800);
    }
  } else if (player_sum > 70 && current_position <= 70) {
    player.style.left = `450px`;
    setTimeout(() => {
      player.style.bottom = `350px`;
      setTimeout(() => {
        x = x - 60;
        player.style.left = `${x * 50 - 100 * (x - 10)}px`;
      }, 400);
    }, 800);
  } else if (player_sum <= 80) {
    x = x - 60;
    player.style.left = `${x * 50 - 100 * (x - 10)}px`;
    player.style.bottom = `350px`;
  } else if (player_sum > 80 && current_position <= 80) {
    player.style.left = `0px`;
    setTimeout(() => {
      player.style.bottom = `400px`;
      setTimeout(() => {
        x = x - 80;
        player.style.left = `${x * 50 - 50}px`;
      }, 400);
    }, 800);
    // Check if player is eaten by snake 5
    if (player_sum === 85) {
      player_sum -= 19;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `250px`;
        player.style.bottom = `300px`;
      }, 1600);
    }
  } else if (player_sum <= 90) {
    x = x - 80;
    player.style.left = `${x * 50 - 50}px`;
    player.style.bottom = `400px`;
    // Check if player is eaten by snake 5
    if (player_sum === 85) {
      player_sum -= 19;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `250px`;
        player.style.bottom = `300px`;
      }, 800);
    }
  } else if (player_sum > 90 && current_position <= 90) {
    player.style.left = `450px`;
    setTimeout(() => {
      player.style.bottom = `450px`;
      setTimeout(() => {
        x = x - 80;
        player.style.left = `${x * 50 - 100 * (x - 10)}px`;
      }, 400);
    }, 800);
    // Check if player is eaten by snake 6
    if (player_sum === 92) {
      player_sum -= 21;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `450px`;
        player.style.bottom = `350px`;
      }, 1600);
    }
  } else if (player_sum < 100) {
    x = x - 80;
    player.style.left = `${x * 50 - 100 * (x - 10)}px`;
    player.style.bottom = `450px`;
    // Check if player is eaten by snake 6
    if (player_sum === 92) {
      player_sum -= 21;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `450px`;
        player.style.bottom = `350px`;
      }, 800);
    }
    // Check if player is eaten by snake 7
    if (player_sum === 99) {
      player_sum -= 76;
      setTimeout(() => {
        snake_eating_player_sound.play();
        player.style.left = `100px`;
        player.style.bottom = `100px`;
      }, 800);
    }
  } else if (player_sum === 100) {
    player.style.left = `0px`;
    alert("win");
  } else {
    player_sum -= dice_number;
    if (player_sum === 100) {
      player.style.left = `0px`;
      alert("WIN");
    }
  }
  return player_sum;
}
