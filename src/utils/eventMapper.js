export const mapEventToCard = (event) => {
    if (!event) {
        return {};
    }

    const dateObj = new Date(event.startTime);
    const formattedDate = (date) => {
        const dateObj = new Date(date);

        const datePart = dateObj.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
        });

        const timePart = dateObj.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${datePart}, ${timePart}`;
    };


    const tagsList = [];

    if (event.game?.duration) {
        tagsList.push({ category: 'Длительность', short_name: event.game.duration });
    }
    if (event.game?.setting) {
        tagsList.push({ category: 'Сеттинг', short_name: event.game.setting });
    }

    if (Array.isArray(event.game?.genre)) {
        event.game.genre.forEach((genre) => {
            tagsList.push({
                category: 'Жанр',
                short_name: genre
            });
        });
    }

    const basePrice = event.price ?? 0;
    const discount = event.discount ?? 0;

    const hasDiscount = discount > 0;

    const discountedPrice = hasDiscount
        ? Math.round(basePrice * (1 - discount / 100))
        : basePrice;

    console.log(discountedPrice);
    

    return {
        id: event.id,
        slug: event.slug,
        title: event.title,
        type: event.type,

        eventType: event.type === 'GAME' ? 'Игровая сессия' : 'Событие',
        authorMark: event.game?.system,

        image: `${event.previewPath}`,

        price: discountedPrice,
        originalPrice: hasDiscount ? basePrice : null,
        discount: discount,

        subscribers: event.subscribers,

        isDraft: event.isDraft,
        isAllowed: event.isAllowed,

        tagsList,

        description: event.shortDescription,

        date: formattedDate(event.startTime),
        endTime: event.endTime,

        subscribes: event.currentPlayers || 0,

        maxSubscribes: event.maxPlayers || 0,

        subscribeStatus: event.subscribeStatus ?? null
    };
};
