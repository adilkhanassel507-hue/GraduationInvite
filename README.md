# Graduation Invite Website

Бұл жоба — `index.html`, `gallery.html`, `rsvp.html` сияқты статикалық шақыру сайттары.

## 1. Google Forms арқылы қатысу формасын қосу

1. https://forms.google.com/ сайтына кіріп, жаңа форма жаса.
2. Формаға алаңдар қос:
   - Аты-жөні
   - Телефон
   - Тілек
3. Дайындап болған соң `Send` түймесін бас.
4. `<>` (Embed) белгісін таңдап, `<iframe>` кодын көшір.
5. `rsvp.html` файлына барып, мына жолды таб:
   ```html
   <iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" ...></iframe>
   ```
6. `YOUR_FORM_ID` орнын Google Forms-тен көшірілген ID-мен ауыстыр.
7. Егер қажет болса, төмендегі тікелей сілтемені де орнат:
   ```html
   <a href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform" ...>Google Form</a>
   ```

## 2. GitHub Pages-ке жариялау

### 2.1 Жаңа GitHub репозиторийін жасау

1. GitHub аккаунтына кір.
2. Жаңа репо жаса: мысалы `GraduationInvite`.
3. `Public` түрін таңда.

### 2.2 Жергілікті репозиторийді дайындау

Терминалда жоба қалтасына өтіп:

```powershell
cd "c:\Users\HUAWEI\Desktop\GraduationInvite"
git init
git add .
git commit -m "Initial website commit"
```

### 2.3 GitHub-қа қосу

GitHub-та репозиторий жасағаннан кейін, орнату командаларын пайдаланып:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2.4 GitHub Pages баптау

1. GitHub репо бетіне өту.
2. `Settings` -> `Pages` бөлімін таңдау.
3. `Source` ретінде `main` branch пен `/ (root)` таңда.
4. `Save` бас.

### 2.5 Сайтқа сілтеме алу

GitHub Pages белсендірілсе, сайт мекенжайы осындай болады:

```text
https://YOUR_USERNAME.github.io/REPO_NAME/
```

Мысалы:
```text
https://yourusername.github.io/GraduationInvite/
```

## 3. Қысқаша есіңізде сақтау

- `index.html` — басты бет
- `gallery.html` — галерея
- `rsvp.html` — Google Forms арқылы қатысу беті
- `style.css` — барлық стильдер
- Google Form ID-ін `rsvp.html` ішіндегі iframe URL-ына қою керек

## 4. Тест үшін

1. Жергілікте сайтты ашу:
```powershell
python -m http.server 8000
```
2. Браузерде `http://localhost:8000` аш.
3. `Қатысу` бетіне барып форма дұрыс жүктелетінін тексер.

---

Егер GitHub командаларын орындағанда көмек керек болса, мен кез келген қадамда нақты команда жазып беремін.