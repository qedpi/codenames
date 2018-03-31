const WORDS_CLEANED = ['Africa', 'agent', 'air', 'alien', 'Alps', 'Amazon', 'ambulance', 'america', 'angel', 'Antarctica', 'apple', 'arm', 'Atlantis', 'Australia', 'Aztec', 'back', 'ball', 'band', 'bank', 'bar', 'bark', 'bat', 'battery', 'beach', 'bear', 'beat', 'bed', 'Beijing', 'bell', 'belt', 'Berlin', 'Bermuda', 'berry', 'bill', 'block', 'board', 'bolt', 'bomb', 'bond', 'boom', 'boot', 'bottle', 'bow', 'box', 'bridge', 'brush', 'buck', 'buffalo', 'bug', 'bugle', 'button', 'calf', 'canada', 'cap', 'capital', 'car', 'card', 'carrot', 'casino', 'cast', 'cat', 'cell', 'Centaur', 'center', 'chair', 'change', 'charge', 'check', 'chest', 'chick', 'china', 'chocolate', 'church', 'circle', 'cliff', 'cloak', 'club', 'code', 'cold', 'comic', 'compound', 'concert', 'conductor', 'contract', 'cook', 'copper', 'cotton', 'court', 'cover', 'crane', 'crash', 'cricket', 'cross', 'crown', 'cycle', 'Czech', 'dance', 'date', 'day', 'death', 'deck', 'degree', 'diamond', 'dice', 'dinosaur', 'disease', 'doctor', 'dog', 'draft', 'dragon', 'dress', 'drill', 'drop', 'duck', 'dwarf', 'eagle', 'Egypt', 'embassy', 'engine', 'England', 'Europe', 'eye', 'face', 'fair', 'fall', 'fan', 'fence', 'field', 'fighter', 'figure', 'file', 'film', 'fire', 'fish', 'flute', 'fly', 'foot', 'force', 'forest', 'fork', 'France', 'game', 'gas', 'genius', 'Germany', 'ghost', 'giant', 'glass', 'glove', 'gold', 'grace', 'grass', 'Greece', 'green', 'ground', 'ham', 'hand', 'hawk', 'head', 'heart', 'helicopter', 'Himalayas', 'hole', 'Hollywood', 'honey', 'hood', 'hook', 'horn', 'horse', 'horseshoe', 'hospital', 'hotel', 'ice', 'ice_cream', 'india', 'iron', 'ivory', 'jack', 'jam', 'jet', 'Jupiter', 'kangaroo', 'ketchup', 'key', 'kid', 'king', 'kiwi', 'knife', 'knight', 'lab', 'lap', 'laser', 'lawyer', 'lead', 'lemon', 'Dracula', 'life', 'light', 'limousine', 'line', 'link', 'lion', 'litter', 'python', 'lock', 'log', 'London', 'luck', 'mail', 'mammoth', 'maple', 'marble', 'march', 'mass', 'match', 'mercury', 'Mexico', 'microscope', 'millionaire', 'mine', 'mint', 'missile', 'model', 'mole', 'moon', 'Moscow', 'mount', 'mouse', 'mouth', 'mug', 'nail', 'needle', 'net', 'New_York', 'night', 'ninja', 'note', 'novel', 'nurse', 'nut', 'octopus', 'oil', 'olive', 'Olympus', 'opera', 'orange', 'organ', 'palm', 'pan', 'pants', 'paper', 'parachute', 'park', 'part', 'pass', 'paste', 'penguin', 'phoenix', 'piano', 'pie', 'pilot', 'pin', 'pipe', 'pirate', 'pistol', 'pit', 'pitch', 'plane', 'plastic', 'plate', 'snake', 'play', 'plot', 'point', 'poison', 'pole', 'police', 'pool', 'port', 'post', 'pound', 'press', 'princess', 'pumpkin', 'pupil', 'pyramid', 'queen', 'rabbit', 'racket', 'ray', 'revolution', 'ring', 'robin', 'robot', 'rock', 'Rome', 'root', 'rose', 'roulette', 'round', 'row', 'ruler', 'satellite', 'Saturn', 'scale', 'school', 'scientist', 'scorpion', 'screen', 'skeleton', 'seal', 'server', 'shadow', 'Shakespeare', 'shark', 'ship', 'shoe', 'shop', 'shot', 'sink', 'skyscraper', 'slip', 'slug', 'smuggler', 'snow', 'snowman', 'sock', 'soldier', 'soul', 'sound', 'space', 'spell', 'spider', 'spike', 'spine', 'spot', 'spring', 'spy', 'square', 'stadium', 'staff', 'star', 'state', 'stick', 'stock', 'straw', 'stream', 'strike', 'string', 'sub', 'suit', 'superhero', 'swing', 'switch', 'table', 'tablet', 'tag', 'tail', 'tap', 'teacher', 'telescope', 'temple', 'theater', 'thief', 'thumb', 'tick', 'tie', 'time', 'Tokyo', 'tooth', 'torch', 'tower', 'track', 'train', 'triangle', 'trip', 'trunk', 'tube', 'turkey', 'undertaker', 'unicorn', 'vacuum', 'van', 'vet', 'wake', 'wall', 'war', 'washer', 'Washington', 'watch', 'water', 'wave', 'web', 'well', 'whale', 'whip', 'wind', 'witch', 'worm', 'yard'];
const WORDS_FULL = ['Africa', 'agent', 'air', 'alien', 'Alps', 'Amazon', 'ambulance', 'america', 'angel', 'Antarctica', 'apple', 'arm', 'Atlantis', 'Australia', 'Aztec', 'back', 'ball', 'band', 'bank', 'bar', 'bark', 'bat', 'battery', 'beach', 'bear', 'beat', 'bed', 'Beijing', 'bell', 'belt', 'Berlin', 'Bermuda', 'berry', 'bill', 'block', 'board', 'bolt', 'bomb', 'bond', 'boom', 'boot', 'bottle', 'bow', 'box', 'bridge', 'brush', 'buck', 'buffalo', 'bug', 'bugle', 'button', 'calf', 'canada', 'cap', 'capital', 'car', 'card', 'carrot', 'casino', 'cast', 'cat', 'cell', 'Centaur', 'center', 'chair', 'change', 'charge', 'check', 'chest', 'chick', 'china', 'chocolate', 'church', 'circle', 'cliff', 'cloak', 'club', 'code', 'cold', 'comic', 'compound', 'concert', 'conductor', 'contract', 'cook', 'copper', 'cotton', 'court', 'cover', 'crane', 'crash', 'cricket', 'cross', 'crown', 'cycle', 'Czech', 'dance', 'date', 'day', 'death', 'deck', 'degree', 'diamond', 'dice', 'dinosaur', 'disease', 'doctor', 'dog', 'draft', 'dragon', 'dress', 'drill', 'drop', 'duck', 'dwarf', 'eagle', 'Egypt', 'embassy', 'engine', 'England', 'Europe', 'eye', 'face', 'fair', 'fall', 'fan', 'fence', 'field', 'fighter', 'figure', 'file', 'film', 'fire', 'fish', 'flute', 'fly', 'foot', 'force', 'forest', 'fork', 'France', 'game', 'gas', 'genius', 'Germany', 'ghost', 'giant', 'glass', 'glove', 'gold', 'grace', 'grass', 'Greece', 'green', 'ground', 'ham', 'hand', 'hawk', 'head', 'heart', 'helicopter', 'Himalayas', 'hole', 'Hollywood', 'honey', 'hood', 'hook', 'horn', 'horse', 'horseshoe', 'hospital', 'hotel', 'ice', 'icecream', 'india', 'iron', 'ivory', 'jack', 'jam', 'jet', 'Jupiter', 'kangaroo', 'ketchup', 'key', 'kid', 'king', 'kiwi', 'knife', 'knight', 'lab', 'lap', 'laser', 'lawyer', 'lead', 'lemon', 'Leprechaun', 'life', 'light', 'limousine', 'line', 'link', 'lion', 'litter', 'Loch Ness', 'lock', 'log', 'London', 'luck', 'mail', 'mammoth', 'maple', 'marble', 'march', 'mass', 'match', 'mercury', 'Mexico', 'microscope', 'millionaire', 'mine', 'mint', 'missile', 'model', 'mole', 'moon', 'Moscow', 'mount', 'mouse', 'mouth', 'mug', 'nail', 'needle', 'net', 'New York', 'night', 'ninja', 'note', 'novel', 'nurse', 'nut', 'octopus', 'oil', 'olive', 'Olympus', 'opera', 'orange', 'organ', 'palm', 'pan', 'pants', 'paper', 'parachute', 'park', 'part', 'pass', 'paste', 'penguin', 'phoenix', 'piano', 'pie', 'pilot', 'pin', 'pipe', 'pirate', 'pistol', 'pit', 'pitch', 'plane', 'plastic', 'plate', 'Platypus', 'play', 'plot', 'point', 'poison', 'pole', 'police', 'pool', 'port', 'post', 'pound', 'press', 'princess', 'pumpkin', 'pupil', 'pyramid', 'queen', 'rabbit', 'racket', 'ray', 'revolution', 'ring', 'robin', 'robot', 'rock', 'Rome', 'root', 'rose', 'roulette', 'round', 'row', 'ruler', 'satellite', 'Saturn', 'scale', 'school', 'scientist', 'scorpion', 'screen', 'Scuba diver', 'seal', 'server', 'shadow', 'Shakespeare', 'shark', 'ship', 'shoe', 'shop', 'shot', 'sink', 'skyscraper', 'slip', 'slug', 'smuggler', 'snow', 'snowman', 'sock', 'soldier', 'soul', 'sound', 'space', 'spell', 'spider', 'spike', 'spine', 'spot', 'spring', 'spy', 'square', 'stadium', 'staff', 'star', 'state', 'stick', 'stock', 'straw', 'stream', 'strike', 'string', 'sub', 'suit', 'superhero', 'swing', 'switch', 'table', 'tablet', 'tag', 'tail', 'tap', 'teacher', 'telescope', 'temple', 'theater', 'thief', 'thumb', 'tick', 'tie', 'time', 'Tokyo', 'tooth', 'torch', 'tower', 'track', 'train', 'triangle', 'trip', 'trunk', 'tube', 'turkey', 'undertaker', 'unicorn', 'vacuum', 'van', 'vet', 'wake', 'wall', 'war', 'washer', 'Washington', 'watch', 'water', 'wave', 'web', 'well', 'whale', 'whip', 'wind', 'witch', 'worm', 'yard'];

export default WORDS_CLEANED;
