import guild from "@lib/types/guild";

const sortGuildsAsMutable = (guilds: guild[]) => {
  guilds?.sort((a, b) => {
    if (a.present === undefined || b.present === undefined) {
      return 0;
    }

    if (a.display === undefined || b.display === undefined) {
      return 0;
    }

    if (a.present && !b.present) {
      return -1;
    } else if (!a.present && b.present) {
      return 1;
    } else {
      const order = { Owner: 1, Administrator: 2 };

      if (!(a.display in order) || !(b.display in order)) {
        return 0;
      }

      return order[a.display as keyof typeof order] - order[b.display as keyof typeof order];
    }
  });
};

export default sortGuildsAsMutable;
