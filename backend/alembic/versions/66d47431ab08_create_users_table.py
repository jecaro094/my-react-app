"""create users table

Revision ID: 66d47431ab08
Revises: 0170b214a1c3
Create Date: 2024-06-20 16:58:55.898152

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '66d47431ab08'
down_revision: Union[str, None] = '0170b214a1c3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('email', sa.String, primary_key=True),
        sa.Column('username', sa.String, nullable=False),
        sa.Column('password', sa.String, nullable=False),
    )


def downgrade() -> None:
    op.drop_table('users')
