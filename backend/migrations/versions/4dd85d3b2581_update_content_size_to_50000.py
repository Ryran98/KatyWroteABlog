"""update content size to 50000

Revision ID: 4dd85d3b2581
Revises: 2bbb0d37989a
Create Date: 2022-11-22 23:51:19.655673

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4dd85d3b2581'
down_revision = '2bbb0d37989a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('BlogPost', 'content')
    op.add_column('BlogPost',
        sa.Column('content', sa.Text(length=50000), nullable=False)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('BlogPost', 'content')
    op.add_column('BlogPost',
        sa.Column('content', sa.String(length=5000), nullable=False)
    )
    # ### end Alembic commands ###